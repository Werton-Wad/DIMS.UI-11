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

function firestoreCollectionMembers() {
  return firebase.firestore().collection('members');
}

async function addMemberToDb(member) {
  try {
    await firestoreCollectionMembers().add(member);
  } catch (e) {
    throw e;
  }
}

async function getMembers() {
  try {
    await firebase.initializeApp(firebaseConfig);
    const membersDB = await firestoreCollectionMembers().get();
    let members = membersDB.docs.map((doc) => doc.data());
    if (members.length) {
      return members;
    } else {
      members = createData(10);
      members.map(async (member) => await addMemberToDb(member));
      return members;
    }
  } catch (e) {
    throw e;
  }
}

export const db = {
  addMemberToDb: addMemberToDb,
  getMembers: getMembers,
  firebaseConfig: firebaseConfig,
};
