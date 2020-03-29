import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Config = {
    apiKey: "AIzaSyAkdrEfpoG74yu6GUyMo4W-DQ-apPTPWIE",
    authDomain: "crown-awesome.firebaseapp.com",
    databaseURL: "https://crown-awesome.firebaseio.com",
    projectId: "crown-awesome",
    storageBucket: "crown-awesome.appspot.com",
    messagingSenderId: "350336632954",
    appId: "1:350336632954:web:ddd15159593a50316813c3",
    measurementId: "G-1WQ6ZP6NZN"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    // console.log(snapShot);
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
  }

  firebase.initializeApp(Config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

