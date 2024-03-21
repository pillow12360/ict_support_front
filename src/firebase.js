// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD2iVdlWY-RhyaIOcvqnC9ZLUEHe8ZI0yM',
  authDomain: 'ict-support-59ce4.firebaseapp.com',
  projectId: 'ict-support-59ce4',
  storageBucket: 'ict-support-59ce4.appspot.com',
  messagingSenderId: '939359568029',
  appId: '1:939359568029:web:c48559167644ed802e5474',
  measurementId: 'G-QSYF0CYT51',
  databaseURL: 'https://ict-support-59ce4-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const realtimeDatabase = getDatabase(app); // Realtime Database 초기화

export { db, realtimeDatabase };
