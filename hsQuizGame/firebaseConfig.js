import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCoJVon1bbgXV1YFP-14Y8CtL1BDp-uPjo",
    authDomain: "hsquizgame.firebaseapp.com",
    projectId: "hsquizgame",
    storageBucket: "hsquizgame.firebasestorage.app",
    messagingSenderId: "842037363386",
    appId: "1:842037363386:web:ad8742521a61105ce27883"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

auth.settings.appVerificationDisabledForTesting = true;
// export const auth = getAuth(app);
export const db = getFirestore(app);

export {auth}