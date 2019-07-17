console.log("Hello World")
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyCe0tm7384vahEsARsVVpGKhPNiEgqWlss",
    authDomain: "train-scheduler-8ba87.firebaseapp.com",
    databaseURL: "https://train-scheduler-8ba87.firebaseio.com",
    projectId: "train-scheduler-8ba87",
    storageBucket: "train-scheduler-8ba87.appspot.com",
    messagingSenderId: "508939553668",
    appId: "1:508939553668:web:b616725c9eb8ff10"
};
// Initialize Firebase
firebase.initializeApp(config);
//Create database variable for Firebase
var dataRef = firebase.database();
