import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

async function addMemberToDb(member) {
  await firebase
    .firestore()
    .collection('members')
    .add(member);
}

async function getMembers() {
  await firebase.initializeApp(firebaseConfig);
  const membersDB = await firebase
    .firestore()
    .collection('members')
    .get();
  return membersDB.docs.map((doc) => doc.data());
}

export const db = {
  addMemberToDb: addMemberToDb,
  getMembers: getMembers,
  firebaseConfig: firebaseConfig,
};
