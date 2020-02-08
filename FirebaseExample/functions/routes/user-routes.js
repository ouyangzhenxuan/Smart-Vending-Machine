// API operation to user personal information

const routes = require('express').Router();
var firebase = require('firebase');
const crypto = require('crypto');

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

// firebase.initializeApp(config);

routes.get('/test', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});


routes.post('/deletepin', (requset, response)=>{
    var target_user_email = requset.body.email;
    var target_user_email_hash = crypto.createHash('md5').update(target_user_email).digest("hex");

    var ref_user = firebase.database().ref('temporaryPin');
    ref_user.once('value', function(snapshot){
        if(snapshot.child(target_user_email_hash).val()==null){
            console.log('1');
            response.send('User not exists');
        }else{
            firebase.database().ref('temporaryPin/'+target_user_email_hash).remove()
                .then(function(){
                    console.log('succes');
                    response.send('Delete the user pin done!')
                })
                .catch(function(error){
                    console.log('Remove fail: '+ error);
                    response.send('Remove fail');
                });
        }
    });
});

module.exports = routes;