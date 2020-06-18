import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVWH3AVZ11Jg9UyAixJLE5vop0ZIVm_S0",
    authDomain: "jornadas2020.firebaseapp.com",
    databaseURL: "https://jornadas2020.firebaseio.com",
    projectId: "jornadas2020",
    storageBucket: "jornadas2020.appspot.com",
    messagingSenderId: "741513696918",
    appId: "1:741513696918:web:9d4093bc4275f74b9c94b7",
    measurementId: "G-WRX4CX8XC5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;