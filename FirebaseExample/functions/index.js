const functions = require('firebase-functions');
// let Promise = require('promise')
const express = require('express');
var firebase = require('firebase');
const crypto = require('crypto')
var nodemailer = require('nodemailer');
const moment = require('moment');
var bcrypt = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken')



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

var jwt = require('jwt-simple');
var app = express();
app.set('jwtTokenSecret', 'Yooooooo');

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

const routes = require('./routes/index');
app.use('/', routes);
// app.use('/index', './routes/index');
const pdfgenerator = require('./routes/pdf-generator');
app.use('/pdf', pdfgenerator);
//
const price = require('./routes/price');
app.use('/price', price);
const user = require('./routes/user');
app.use('/user', user);
const vendingmachine = require('./routes/vendingmachine');
app.use('/vm', vendingmachine);
//
const analysis = require('./routes/analysis');
app.use('/analysis', analysis);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type','x-access-token');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  });

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
                password : crypto.createHash('md5').update(password).digest("hex"),
                vm_number:0,
                vm_id:0,
            });
            
            response.send('ok')

        }else{
            response.send("user already exist");
        }
});
app.post('/check', (request, response)=>{
    let hash = crypto.createHash('md5').update(request.body.email).digest("hex")
    var ref = firebase.database().ref('users');
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var find = false;
        for( var i in data){
            console.log(i['email'])
            if(i==hash){
                find = true;
            }
        }

       if(find){
            response.send({ status:"OK"});
        }else{
            response.send({status:"NO"});
        }
    }, function (error) {
       console.log("Error: " + error.code);
       response.send('no');
    }); 
});

app.post('/checktoken', (request, response)=>{
    let hash = crypto.createHash('md5').update(request.body.email).digest("hex")
    firebase.database().ref('token/'+hash+'/id').on("value", function(snapshot) {
        console.log(snapshot.val(),request.body.id)
        if(request.body.id == snapshot.val()){
            response.send("YE")
        }else{
            response.send('NO')
        }
    });
});

app.post('/login', (request, response)=>{
    var ref = firebase.database().ref('users');
    var id = 'no'
    var email_input=request.body.email;
    let hash = crypto.createHash('md5').update(email_input).digest("hex")
    var password_input=request.body.password;
    var password;
    ref.once("value", function(snapshot) {
       password = snapshot.child(hash).child('password').val();
       
    }, function (error) {
       console.log("Error: " + error.code);
       response.send('no');
    }).then(function(){
        password_input = crypto.createHash('md5').update(password_input).digest("hex")
        if(password==password_input){
            id =makeid(6)
             var expires = moment().add('days', 1).valueOf();
             var token = jsonwebtoken.sign({ email: email_input }, 'f', {
                 expiresIn: 86400, // expires in 24 hours
               })
            firebase.database().ref('token/'+hash).set({
                 id: id
             }).then(function(){
                response.status(200).send({ auth: true, token: token,id:id });
             })
         }else{
             response.send('no');
         }
    }); 
});

app.post('/getimage', (request,response)=>{
    function replacer(key,value)
    {
        if (key=="password") return undefined;
        else if (key=="vm") return undefined;
        else return value;
    }
    let token = request.body.token;
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    jsonwebtoken.verify(token, 'f', function(err, decoded) {
      if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });

    var ref = firebase.database().ref('users');
    ref.on("value", function(snapshot) {
       var email_input=request.body.email;
       let hash = crypto.createHash('md5').update(email_input).digest("hex")
       var data = snapshot.child(hash).val()
       var d = JSON.stringify(data,replacer)
       response.json(JSON.parse(d));
       
    }, function (error) {
        console.log("Error: " + error.code);
        response.send('no');
     }); 
})

app.post('/updateuser', (request, response) => {
    let token = request.body.token;
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    jsonwebtoken.verify(token, 'f', function(err, decoded) {
      if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    });

    let address = request.body.address
    let image = request.body.image
    if(!image){
        image = 'default image'
    }
    if(!address){
        address = 'default address'
    }
    let name = request.body.username
    if(!name){
        name = "default name"
    }
    var email = request.body.email
    let hash = crypto.createHash('md5').update(email).digest("hex")

    firebase.database().ref('users/' + hash).update({
        address: address,
        image: image,
        username: name,
    }).then(function(){
        response.end({auth:true, message:'update success!'})
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
    let hash = crypto.createHash('md5').update(email).digest("hex")

    firebase.database().ref('temporaryPin/' + hash).set({
        email: email,
        pin: tempPassword,
    }).then(function(){
        setTimeout(function(){
            firebase.database().ref('temporaryPin/'+hash).remove()
                    .then(function(){
                        console.log('succes');
                    })
                    .catch(function(error){
                        console.log('Remove fail: '+ error);
                    });
    
        }, 10 * 10000);

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              response.send(error)
            } else {
              console.log('Email sent: ' + info.response);
              response.send("okay");
            }
        }); 
    });
});

app.post('/changePassword', (request, response) => {
    var new_password=request.body.password;
    new_password = crypto.createHash('md5').update(new_password).digest("hex")
    var email=request.body.email;
    var input_pin = request.body.pin;
    console.log(email)
    let hash = crypto.createHash('md5').update(email).digest("hex")
    console.log(hash)
    var ref_pin = firebase.database().ref('temporaryPin');
    ref_pin.on("value", function(snapshot) {
        if(snapshot.child(hash).child('pin').val()==input_pin && input_pin!=null){
            firebase.database().ref('users/' + hash).update({
                password : new_password,
            });
            response.send({status:"OK"});
            console.log(new_password);
        }else{
            response.send({status:'NO'})
        }
        
    },function (error){
        response.send(error);
    });

});

app.post('/addvm', (request, response) => {
    let latitude = request.body.latitude
    let longitude = request.body.longitude
    var email=request.body.email;
    let hash = crypto.createHash('md5').update(email).digest("hex")
    var refer = firebase.database().ref('users');

    var ref_vm = firebase.database().ref('users/'+hash);
    var ref_vm_set = firebase.database().ref('users/'+hash);
    var vm_id = 0
    var real_vm = 0
    let p = new Promise(function(resolve, reject) {
        ref_vm.once("value", function(snapshot) {       
            vm_id = snapshot.child('vm_number').val()+1
            real_vm = snapshot.child('vm_real').val()
            
            console.log([vm_id,real_vm])
            resolve([vm_id,real_vm])
        })
        console.log('tishu')
      }); 
    p.then(function(params){
        console.log("WTF2")
        firebase.database().ref('users/' + hash+'/vm/'+vm_id).set({
            vm_id: params[0],
            latitude: latitude,
            longitude:  longitude,
            sales: 0,
        });
    }).then(function(params){
        console.log("WTF3")
        ref_vm_set.update({
            vm_real : real_vm+1,
            vm_number : vm_id
        })
    })
    response.send("complete");
});


 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
