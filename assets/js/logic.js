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
var minutes = 0
// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#firstTrain-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Code for the push
  dataRef.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  });
});

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        // console.log(childSnapshot.val().name);
        // console.log(childSnapshot.val().destination);
        // console.log(childSnapshot.val().firstTrain);
        // console.log(childSnapshot.val().frequency);
  
        // full list of items to the well
        $("#all-trains-list").append("<div class='well'><span class='train-name'> Name: " + childSnapshot.val().name +
          " </span><span class='train-destination'> Destination: " + childSnapshot.val().destination + " </span></div>");
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
      dataRef.ref().orderByChild("name").on("child_added", function(snapshot) {
        // Change the HTML to reflect
        console.log((snapshot.val().name));
        console.log((snapshot.val().destination));
        console.log((snapshot.val().firstTrain));
        console.log((snapshot.val().frequency));
     
    // Frequency Var
      var tFrequency = snapshot.val().frequency;

      // Time is 3:30 AM
      var firstTime = snapshot.val().frequency;
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "year");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("#name-display").text(snapshot.val().name);
        $("#destination-display").text("DESTINATION: " + snapshot.val().destination);
        $("#nextTrain-display").text("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    });