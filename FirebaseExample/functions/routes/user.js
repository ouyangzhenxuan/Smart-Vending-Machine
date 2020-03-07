const routes = require('express').Router();
// const express = require('express');
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

routes.post('/login', (request, response)=>{
    var ref = firebase.database().ref('users');
    
    var password_input=request.body.password;
    password_input = crypto.createHash('md5').update(password_input).digest("hex")
    var email_input=request.body.email;
    let hash = crypto.createHash('md5').update(email_input).digest("hex")
    var password;

    ref.once("value", function(snapshot) {
       password = snapshot.child(hash).child('password').val();
    }, function (error) {
       console.log("Error: " + error.code);
       response.send('no');
    }).then(
        function(){
            if(password==password_input){
                response.send('okay');
            }else{
                console.log(password);
                console.log(password_input);
                console.log(hash);
                console.log(email_input);
                response.send('no');
            }
        }
    ); 
    
 });

 routes.post('/signup', (request, response) => {
    console.log("HTTP Get Request");
    var name=request.body.name;
    var password=request.body.password;
    var email=request.body.email;

    let hash = crypto.createHash('md5').update(email).digest("hex")
    var refer = firebase.database().ref('users');
    var pass;

    refer.once("value", function(snapshot) {
        pass = snapshot.child(hash).child('password').val();
        console.log(pass);
    }).then(
        function(){
            if(pass==null){
                firebase.database().ref('users/' + hash).set({
                    username: name,
                    email: email,
                    password : crypto.createHash('md5').update(password).digest("hex"),
                    vm_number:0,
                    vm_id:0,
                });
                response.send("complete");
            }else{
                response.send("user already exist");
            }
        }
    );
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

routes.post('/sendemail', (request, response) => {
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

    setTimeout(function(){
        firebase.database().ref('temporaryPin/'+hash).remove()
                .then(function(){
                    console.log('succes');
                })
                .catch(function(error){
                    console.log('Remove fail: '+ error);
                });

    }, 8 * 10000);
});

routes.post('/changepassword', (request, response) => {
    var new_password=request.body.password;
    var email=request.body.email;
    var input_pin = request.body.pin;

    new_password = crypto.createHash('md5').update(new_password).digest("hex")
    let hash = crypto.createHash('md5').update(email).digest("hex");
    var ref_pin = firebase.database().ref('temporaryPin');
    var inner_pin;

    ref_pin.once("value", function(snapshot) {
        inner_pin = snapshot.child(hash).child('pin').val();
    },function (error){
        response.send(error);
    }).then(
        function(){
            if(input_pin!=null && inner_pin==input_pin){
                firebase.database().ref('users/' + hash).update({
                    password : new_password,
                });
                response.send("200");
                console.log(new_password);
            }else{
                response.send('WRONG')
            }
        }
    );

});

module.exports = routes;