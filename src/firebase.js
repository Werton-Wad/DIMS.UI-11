import firebase from 'firebase';

import { createData } from './components/utilis';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

function firestoreCollection(collection) {
  return firebase.firestore().collection(collection);
}

async function addMemberToCollection(member, collection) {
  try {
    await firestoreCollection(collection).add(member);
  } catch (e) {
    throw e;
  }
}
const firebaseApp = firebase.initializeApp(firebaseConfig);

async function registerPasswordUser(email, password) {
  try {
    const authFirebase = firebase.auth();
    await authFirebase.createUserWithEmailAndPassword(email, password);
  } catch (e) {
    throw e;
  }
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
        console.log(other);
        await registerPasswordUser(other.email, '12345678');
        progress.map(async (item) => {
          await addMemberToCollection(item, 'progress');
        });
        tasks.map(async (task) => {
          await addMemberToCollection(task, 'tasks');
        });
      });
      return members;
    }
  } catch (e) {
    throw e;
  }
}

async function getMember(memberId) {
  try {
    const result = await firestoreCollection('members')
      .where('id', '==', memberId)
      .get();
    return result.docs.map((doc) => doc.data())[0];
  } catch (e) {
    throw e;
  }
}
async function getMemberTasks(memberId) {
  try {
    const result = await firestoreCollection('tasks')
      .where('userId', '==', memberId)
      .get();
    const tasks = result.docs.map((doc) => doc.data());
    return tasks;
  } catch (e) {
    throw e;
  }
}
async function getTaskById(taskId) {
  try {
    const result = await firestoreCollection('tasks')
      .where('id', '==', taskId)
      .get();
    const task = result.docs.map((doc) => doc.data())[0];
    return task;
  } catch (e) {
    throw e;
  }
}
async function getAllTasks() {
  try {
    const result = await firestoreCollection('tasks').get();
    return result.docs.map((doc) => doc.data());
  } catch (e) {
    throw e;
  }
}
async function getMemberProgress(memberId) {
  try {
    const result = await firestoreCollection('progress')
      .where('userId', '==', memberId)
      .get();
    return result.docs.map((doc) => doc.data());
  } catch (e) {
    throw e;
  }
}
async function getTaskTracks(taskId) {
  try {
    const result = await firestoreCollection('progress')
      .where('taskId', '==', taskId)
      .get();
    return result.docs.map((doc) => doc.data());
  } catch (e) {
    throw e;
  }
}

export const db = {
  getMembers: getMembers,
  getMemberTasks: getMemberTasks,
  getMemberProgress: getMemberProgress,
  getMember: getMember,
  getAllTasks: getAllTasks,
  getTaskById: getTaskById,
  getTaskTracks: getTaskTracks,
  firebaseApp: firebaseApp,
  firebaseConfig: firebaseConfig,
};
