import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD20sjs5LVialjbX_4ZEhV1vyj9DH4otsQ",
  authDomain: "crudreact-app.firebaseapp.com",
  projectId: "crudreact-app",
  storageBucket: "crudreact-app.appspot.com",
  messagingSenderId: "1092970524976",
  appId: "1:1092970524976:web:5ed03899025e8446b658f5",
  measurementId: "G-QHHY7HQMKE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
