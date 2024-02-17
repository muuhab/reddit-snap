import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { SubredditType } from "./types";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const Firebase = initializeApp(firebaseConfig);

const db = getFirestore(Firebase);

export const saveToFirebase = async (subreddit: SubredditType) => {
  try {
    const existingSubredditQuery = query(
      collection(db, "subreddits"),
      where("id", "==", subreddit.name)
    );

    const existingSubredditSnapshot = await getDocs(existingSubredditQuery);

    if (existingSubredditSnapshot.empty) {
      const docRef = await addDoc(collection(db, "subreddits"), {
        id: subreddit.id,
        subreddit,
      });
      console.log("Document written with ID: ", docRef.id);
    } else {
      console.log("Subreddit already exists:", subreddit.id);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
