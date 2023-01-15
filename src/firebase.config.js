// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaRkOVm-poyYw-Go6LFkFqVL4z4xbok60",
  authDomain: "database-588b0.firebaseapp.com",
  projectId: "database-588b0",
  storageBucket: "database-588b0.appspot.com",
  messagingSenderId: "998494414637",
  appId: "1:998494414637:web:ad5b9d46fbf76c66cc55a4",
  measurementId: "G-W5F821TJRC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
