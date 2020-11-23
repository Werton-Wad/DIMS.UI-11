import firebase from 'firebase';

import { createData } from './components/utilis';
import auth from './components/Auth/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const signInConfig = {
  signInFlow: 'popup',
  signInService: {
    google: new firebase.auth.GoogleAuthProvider(),
    facebook: new firebase.auth.FacebookAuthProvider(),
    github: new firebase.auth.GithubAuthProvider(),
  },
};

function firestoreCollection(collection) {
  return firebase.firestore().collection(collection);
}

async function addMemberToCollection(member, collection) {
  try {
    await firestoreCollection(collection).add(member);
  } catch (e) {}
}
async function initAppFirebase() {
  try {
    await firebase.initializeApp(firebaseConfig);
  } catch (e) {}
}
async function getMembers() {
  try {
    const membersDB = await firestoreCollection('members').get();
    let members = membersDB.docs.map((doc) => doc.data());
    if (members.length) {
      return members;
    } else {
      members = createData(10);
      members.map(async (member) => {
        const { tasks, progress, ...other } = member;
        await addMemberToCollection(other, 'members');
        await Promise.all(
          progress.map((item) => {
            addMemberToCollection(item, 'progress');
          }),
        ).catch((e) => {});
        await Promise.all(
          tasks.map((task) => {
            addMemberToCollection(task, 'tasks');
          }),
        ).catch((e) => {});
      });
      return members;
    }
  } catch (e) {}
}

async function getMember(memberId) {
  try {
    const result = await firestoreCollection('members')
      .where('id', '==', memberId)
      .get();
    return result.docs.map((doc) => doc.data())[0];
  } catch (e) {}
}
async function getMemberTasks(memberId) {
  try {
    const result = await firestoreCollection('tasks')
      .where('userId', '==', memberId)
      .get();
    const tasks = result.docs.map((doc) => doc.data());
    return tasks;
  } catch (e) {}
}
async function getTaskById(taskId) {
  try {
    const result = await firestoreCollection('tasks')
      .where('id', '==', taskId)
      .get();
    const task = result.docs.map((doc) => doc.data())[0];
    return task;
  } catch (e) {}
}
async function getAllTasks() {
  try {
    const result = await firestoreCollection('tasks').get();
    return result.docs.map((doc) => doc.data());
  } catch (e) {}
}
async function getMemberProgress(memberId) {
  try {
    const result = await firestoreCollection('progress')
      .where('userId', '==', memberId)
      .get();
    return result.docs.map((doc) => doc.data());
  } catch (e) {}
}
async function getTaskTracks(taskId) {
  try {
    const result = await firestoreCollection('progress')
      .where('taskId', '==', taskId)
      .get();
    return result.docs.map((doc) => doc.data());
  } catch (e) {}
}
async function signInWithGoogle() {
  const authFirebase = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const result = await authFirebase.signInWithPopup(googleProvider);
  console.log(result.user.email);
  auth.setAuthInformation(result.user.email);
}
async function signInWithFacebook() {
  const auth = firebase.auth();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(facebookProvider)
    .then((res) => {
      console.log(res.user.email);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
async function signInWithGithub() {
  const auth = firebase.auth();
  const githubProvider = new firebase.auth.GithubAuthProvider();
  auth
    .signInWithPopup(githubProvider)
    .then((res) => {
      console.log(res.user.email);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const db = {
  initAppFirebase: initAppFirebase,
  getMembers: getMembers,
  getMemberTasks: getMemberTasks,
  getMemberProgress: getMemberProgress,
  getMember: getMember,
  getAllTasks: getAllTasks,
  getTaskById: getTaskById,
  getTaskTracks: getTaskTracks,
};
