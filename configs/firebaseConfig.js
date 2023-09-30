
const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyAagJ1cNEhtokqfkCcwzC966kwKR6R45Q0",
  authDomain: "students-data-7cfb3.firebaseapp.com",
  projectId: "students-data-7cfb3",
  storageBucket: "students-data-7cfb3.appspot.com",
  messagingSenderId: "778440708824",
  appId: "1:778440708824:web:0ba54d273ad1c54af7bdad",
  measurementId: "G-MW0XSPG5K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Create a reference to the "students" collection
const studentsCollection = collection(db, "students");


module.exports = db;