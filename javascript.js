// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,remove,update, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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
const database = getDatabase();

var inp = document.getElementById("task")

window.sendtodo = function () {
    var obj = {
        task: inp.value,
        date: JSON.stringify(new Date())
    };
    const keyRef = ref(database, 'todotask')
    obj.id=push(keyRef).key;
    const refrences = ref(database, `todotask/${obj.id}/`);



    set(refrences,obj)
        console.log(obj.id)
        console.log(obj)


}
var list = []
function renderData(){
    const refrences = ref(database, `todotask/`);
    var parent = document.getElementById('parent')
    parent.innerHTML = "";
    for(var i=0;  i<list.length; i++){
        parent.innerHTML += `<ul><li id=${list[i].id}>${list[i].task}</br><span class='chip'>${list[i].date}</span><button onclick="delTask(this)" id="del">${"Delete"}</button><button onclick="editask(this)" id="edit">${"Edit"}</button></li></ul>`;
    }
}
"user"
var un = [];
function username(){

  var usn =  document.getElementById('user');
  usn.innerHTML = "";
  for (var i=0; i<un.length; i++){
    usn.innerHTML += `<h2>${un[i].user}</h2>`
  }

}
username();

window.getdata = function () {

  onValue(ref(database, '/todotask/'), (snapshot) => {
    console.log(snapshot.val())
  });


  const taskRef =ref(database,'todotask/');
  onChildAdded(taskRef, function(data){
   list.push(data.val());
      console.log(data.val());
      renderData();
  });
  console.log(list)

}
window.delTask = function(y){
    let UID = y.parentElement.getAttribute("id")
  remove(ref(database,`todotask/${UID}`))
  .then(()=>{
    alert("data removed successfully ")
  })
  .catch((error)=>{
     alert("error"+error)
  })
  y.parentElement.parentElement.remove()
}
window.editask = function(y){
    let Value = prompt("Please Enter Change Value",y.parentElement.value)
    let UID = y.parentElement.getAttribute("id")
  const REF = ref(database, `todotask/${UID}`);
  update(REF,{
    task: Value,
  })
  .then(()=>{
    alert("data Update successfully ")
    var parent = document.getElementById('parent')
    parent.innerHTML=""
    getdata()
  })
  .catch((error)=>{
     alert("error"+error)
  })
// console.log()
  
}
// window.delTask = function () {
//     var parent = document.getElementById('parent')
//     var li = document.getElementById('li')
//     // console.log(refrences)
  
//     const refrences = ref(database, `todotask/`)
  
//   refrences.remove();
  
  
//   }
  



window.logout = function () {
  signOut(auth)
    .then(function () {
      alert("Logout Successfully");
      window.location.href = "login.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html";
    }
  });
}
checkAuthentication();