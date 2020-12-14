import * as firebase from "firebase/app";
import "firebase/auth";

// const FIREBASE_KEY = process.env.FIREBASE_KEY;
// const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
// const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL;
// const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
// const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
// const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
// const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
// const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID;

const FIREBASE_KEY = "AIzaSyCkhlUKdbkaMnorgs4OeQ0-pro93v-rWHo";
const FIREBASE_AUTH_DOMAIN = "downtownstimulus.firebaseapp.com";
const FIREBASE_DATABASE_URL = "https://downtownstimulus.firebaseio.com";
const FIREBASE_PROJECT_ID = "downtownstimulus";
const FIREBASE_STORAGE_BUCKET = "downtownstimulus.appspot.com";
const FIREBASE_MESSAGING_SENDER_ID = "993720869238";
const FIREBASE_APP_ID = "1:993720869238:web:b22cb483737dd5c71dda57";

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signInSocial = async (pType: string) => {
  var provider =
    pType === "google"
      ? new firebase.auth.GoogleAuthProvider()
      : new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = (result.credential.toJSON() as any).oauthAccessToken;
    // The signed-in user info.
    var user = result.user;
    return { user, token };
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // eslint-disable-next-line
    console.log(errorCode, errorMessage, email, credential);
  }
};

export const getAuthToken = async () => {
  const result = await firebase.auth().currentUser.getIdToken();
  return result;
};

export const logoutUser = async () => {
  await firebase.auth().signOut();
};
