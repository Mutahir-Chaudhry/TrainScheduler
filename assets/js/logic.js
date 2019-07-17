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
// Initial Values
var name = "";
var destination = "";
var firstTrainTime = 0000;
var frequency = 0;
// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();
  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Dont forget to provide initial data to your Firebase database.
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#firstTrain-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  // Code for the push
  dataRef.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().joinDate);
  
        // full list of items to the well
        $("#all-trains-list").append("<div class='well'><span class='train-name'> " + childSnapshot.val().name +
          " </span><span class='train-destination'> " + childSnapshot.val().destination +
          " </span><span class='train-firstTrain'> " + childSnapshot.val().firstTrainTime +
          " </span><span class='train-frequency'> " + childSnapshot.val().frequency + " </span></div>");
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
      dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#destination-display").text(snapshot.val().destination);
        $("#firstTrain-display").text(snapshot.val().firstTrainTime);
        $("#frequency-display").text(snapshot.val().frequency);
      });