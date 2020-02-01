const functions = require('firebase-functions');
const express = require('express');
var firebase = require('firebase');
const crypto = require('crypto')

var config = {
    apiKey: "AIzaSyDEg1WylC8trdpBbfqKLRA4zB0jy0jPnic",
    authDomain: "vending-insights-smu.firebaseapp.com",
    databaseURL: "https://vending-insights-smu.firebaseio.com",
    projectId: "vending-insights-smu",
    storageBucket: "vending-insights-smu.appspot.com",
    messagingSenderId: "571022970290",
    appId: "1:571022970290:web:65a2eafc131f00b9d0e8ab",
    measurementId: "G-5C2MKGRZHY"
  };

  firebase.initializeApp(config);

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


function writeUserData(name, email, password) {
    // const real_email=email;
    let hash = crypto.createHash('md5').update(email).digest("hex")
    var ref = firebase.database().ref('users');
    var password = snapshot.child(hash).child('password').val();
    if(password==null){
        firebase.database().ref('users/' + hash).set({
            username: name,
            email: email,
            password : password
          });
        response.send("complete");
    }else{
        response.send("user already exist");
    }
  }

app.post('/signup', (request, response) => {
    console.log("HTTP Get Request");
    // response.send('HTTP GET Request');
    //Insert key,value pair to database
    // firebase.database().ref('/Test').set({message: 'miaomiao'});
    var name=request.body.name;
    var password=request.body.password;
    var email=request.body.email;

    let hash = crypto.createHash('md5').update(email).digest("hex")
    var ref = firebase.database().ref('users');
    ref.on("value", function(snapshot) {
        var password = snapshot.child(hash).child('password').val();
    
    if(password==null){
        firebase.database().ref('users/' + hash).set({
            username: name,
            email: email,
            password : password
          });
        response.send("complete");
    }else{
        response.send("user already exist");
    }
    });
    // response.send(request.body.name);
});

app.post('/login', (request, response)=>{
    var ref = firebase.database().ref('users');
    ref.on("value", function(snapshot) {
       var password_input=request.body.password;
       var email_input=request.body.email;
       
       let hash = crypto.createHash('md5').update(email_input).digest("hex")
       var password = snapshot.child(hash).child('password').val();

       if(password==password_input){
            response.send('okay');
        }else{
            response.send('no');
        }
    }, function (error) {
       console.log("Error: " + error.code);
       response.send('no');
    }); 

});

app.get('/timestamp', (request, response) => {
    response.send(`123`);
});



 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
