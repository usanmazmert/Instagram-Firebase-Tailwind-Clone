import {initializeApp} from "firebase/app";
import "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { seedDatabase } from "../seed";

const config = {
    apiKey: "AIzaSyDfT-qfbJSi-BMGnZLc48zv2slpvRWxqo8",
  authDomain: "instagram-yt-36dc0.firebaseapp.com",
  projectId: "instagram-yt-36dc0",
  storageBucket: "instagram-yt-36dc0.appspot.com",
  messagingSenderId: "171987402584",
  appId: "1:171987402584:web:ad07736d07e409dc082f2d"
};

const firebase = initializeApp(config)
const FieldValue = getFirestore(firebase);

// seedDatabase(FieldValue)

export {firebase, FieldValue}