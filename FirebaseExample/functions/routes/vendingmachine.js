const routes = require('express').Router();
// const express = require('express');
var firebase = require('firebase');
const crypto = require('crypto');

routes.post('/addvm', (request, response) => {
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

module.exports = routes;