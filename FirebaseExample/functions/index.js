const functions = require('firebase-functions');
const express = require('express');
var firebase = require('firebase');
const crypto = require('crypto')
var nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'smartvvvmachine@gmail.com',
        pass: 'swvault123'
    }
});

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

const routes = require('./routes');
app.use('/', routes);

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

app.use('/test', require('./routes'));
app.use('/getprice', require('./routes'));

// app.use('/', require('./routes/index'));

app.post('/signup', (request, response) => {
    console.log("HTTP Get Request");
    // response.send('HTTP GET Request');
    //Insert key,value pair to database
    // firebase.database().ref('/Test').set({message: 'miaomiao'});
    var name=request.body.name;
    var password=request.body.password;
    var email=request.body.email;

    let hash = crypto.createHash('md5').update(email).digest("hex")
    var refer = firebase.database().ref('users');
    var pass;
    refer.on("value", function(snapshot) {
        pass = snapshot.child(hash).child('password').val();
        console.log(pass);
    });
        if(pass==null){
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

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

app.post('/sendEmail', (request, response) => {
    var tempPassword = makeid(6);
    var email=request.body.email;
    var mailOptions = {
        from: 'smartvvvmachine@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'Your Passowrd Has Been Updated!\nTemporary Password:'+tempPassword+'\n\nSmart Vending Machine',
        html: '<div>Your Passowrd Has Been Updated!</div><div>Temporary Pin:<b>'+tempPassword+'</b></div><hr><div>Smart Vending Machine</div>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          response.send(error)
        } else {
          console.log('Email sent: ' + info.response);
          response.send("okay");
        }
    });
    let hash = crypto.createHash('md5').update(email).digest("hex")

    firebase.database().ref('temporaryPin/' + hash).set({
        email: email,
        pin: tempPassword,
    });
});

app.post('/changePassword', (request, response) => {
    var new_password=request.body.password;
    var email=request.body.email;
    var input_pin = request.body.pin;
    console.log(email)
    let hash = crypto.createHash('md5').update(email).digest("hex")
    console.log(hash)
    var ref_pin = firebase.database().ref('temporaryPin');
    var inside_pin;
    ref_pin.on("value", function(snapshot) {
        if(snapshot.child(hash).child('pin').val()==input_pin && input_pin!=null){
            firebase.database().ref('users/' + hash).update({
                password : new_password,
            });
            response.send("200");
            console.log(new_password);
        }else{
            response.send('WRONG')
        }
        
    },function (error){
        response.send(error);
    });
    
});

 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
