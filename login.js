// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwqgoxbw7GCLO6-YHWBLeW_joWBpSyyVw",
    authDomain: "todoapp-33471.firebaseapp.com",
    databaseURL: "https://todoapp-33471-default-rtdb.firebaseio.com",
    projectId: "todoapp-33471",
    storageBucket: "todoapp-33471.appspot.com",
    messagingSenderId: "898974323299",
    appId: "1:898974323299:web:84508a0890702b31ee5e56",
    measurementId: "G-XWEDDXP7ML"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");
window.login= function(e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      // console.log(success.user.uid);
      alert("logined Successfully")
      window.location.replace('STODO.html')
    })
    .catch(function (err) {
      alert("login error"+err);
    });

  console.log(obj);
}