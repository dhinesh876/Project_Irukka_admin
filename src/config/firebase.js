import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceaccount from "../../irukka-cc032-firebase-adminsdk-fbsvc-fcbf229081.json" with { type: "json" };


// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceaccount),
});

// Get a Firestore instance
export const db = getFirestore();