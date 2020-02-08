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

// routes.get('/asyntest', (request, response)=>{
//     var target_user_email = requset.body.email;
//     var target_user_email_hash = crypto.createHash('md5').update(target_user_email).digest("hex");
//     var ref_user = firebase.database().ref('users');
//     ref_user.on('value', function(snapshot){
//         if(snapshot.child(target_user_email_hash).val()!=null){
            
//         }else{
//             response.send('Not exists');
//         }
//     })
// });

routes.post('/asyntest', (request, response) => {
    let latitude = request.body.latitude
    let longitude = request.body.longitude
    var email = request.body.email;

    let hash = crypto.createHash('md5').update(email).digest("hex")
    var refer = firebase.database().ref('users');

    var ref_vm = firebase.database().ref('users');
    var ref_vm_set = firebase.database().ref('users/'+hash);
    
    let p = new Promise(function(resolve, reject) { 
        resolve()
    }); 
    var vm_id = 0
    var real_vm = 0
    p.then(function(){
        // ref_vm_set.update({
        //     vm_real : real_vm+1,
        //     vm_number : vm_id
        // });
        // console.log("WTF2");
        ref_vm.once("value", function(snapshot) {       
            var vm_id = snapshot.child(hash).child('vm_number').val()+1
            var real_vm = snapshot.child(hash).child('vm_real').val()
            var index = 1;
            firebase.database().ref('users/' + hash+'/vm/'+vm_id).set({
                vm_id: vm_id,
                latitude: latitude,
                longitude:  longitude,
                sales: 0,
            });
            console.log("WTF3")
        });
        console.log("WTF1")
    }).then(function(){
        ref_vm_set.update({
            vm_real : real_vm+1,
            vm_number : vm_id
        });
        console.log("WTF2");
    });

    // var promise = readFile();
    // promise.then(function(data){
    //     console.log(data);
    // }).then(function(){
    //     console.log('hello 2');
    // });
    response.send("complete");
});

function readFile(){
    var p = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('execution done');
            resolve('hello 1');
        }, 2000);
    });
    return p;
};

module.exports = routes;