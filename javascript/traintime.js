

$(document).ready(function() {
     
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAl9I97Xg9vqEmp57Qv6cR1xj2BGNP_iMw",
    authDomain: "firstprojectever-41364.firebaseapp.com",
    databaseURL: "https://firstprojectever-41364.firebaseio.com",
    projectId: "firstprojectever-41364",
    storageBucket: "firstprojectever-41364.appspot.com",
    messagingSenderId: "797812027250"
  };
  firebase.initializeApp(config);

    
    // var to use database
     var database = firebase.database();
    
    // when submit button is clicked
    $(".submit").on("click", function(event) {
        event.preventDefault(); 
        
        
    
        //store name of train and destination
        var trainName = $("#train_name").val().trim();
        var destination = $("#destination").val().trim();
    
        //convert input to time
        var firstStart = moment($("#first-depart").val().trim(), "hh:mm").format("X");
    
        // store frequency
        var frequency = $("#frequency").val().trim();
        
        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
        console.log(trainName);
        console.log(destination);
        console.log(firstStart);
        console.log(frequency);
        console.log(currentTime);
    
    
    
        //gathers together all our new train info
        var newTrain = {
    
            trainName: trainName,
            destination: destination,
            start: firstStart,
            frequency: frequency
        };
    
    
        //uploads newTrain to firebase
        database.ref().push(newTrain);
        //*push* adds to info already in firebase. *set* overwrites preexisting info
        
        //clears elements before adding new text
        $("#first-name").val("");
        $("#destination").val("");
        $("#first-depart").val("");
        $("#frequency").val("");
    
        //supposed to prevent from moving to a new page... idk how
        // return false;
    
    }); //end of onclick
    
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
           
            //store into variables
            var trainName = childSnapshot.val().trainName;
            var destination =childSnapshot.val().destination;
            var firstTime = childSnapshot.val().start;
            var frequency = childSnapshot.val().frequency;
    
    		console.log(trainName);
    		console.log(destination);
    		console.log(firstTime);
    		console.log(frequency);
    

            //makes first train time pretty
            var trainTime = moment.unix(firstTime).format("hh:mm");

            console.log(trainTime);


            //calculate difference between times
            var difference =  moment().diff(moment(trainTime, "X"),"minutes");

            console.log(difference);
    
            //time apart(remainder)
            var trainRemain = difference % frequency;

            console.log(trainRemain);
    
            //minutes until arrival
            var minUntil = frequency - trainRemain;

            console.log(minUntil);
    
            //next arrival time
            var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

            
    
            //populating table
        
            $("#trainTable > tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    
    });
    });
    
    