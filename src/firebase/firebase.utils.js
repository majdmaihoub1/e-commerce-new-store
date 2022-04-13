// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGiQMBRHyJF6oXUSo3HZ53Zf39pHOfiao',
  authDomain: 'store-db-7b280.firebaseapp.com',
  projectId: 'store-db-7b280',
  storageBucket: 'store-db-7b280.appspot.com',
  messagingSenderId: '981799959748',
  appId: '1:981799959748:web:84ca2ffbce4d1531965d91',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore();
export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;
  const userRef = doc(firestore, 'users', `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    console.log(userRef);

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additonalData,
      });
    } catch (error) {
      console.log('erorr creating user');
    }
  }
  return userRef;
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
