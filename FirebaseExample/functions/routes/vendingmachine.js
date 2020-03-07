const routes = require('express').Router();
// const express = require('express');
var firebase = require('firebase');
const crypto = require('crypto');

routes.post('/addvm', (request, response) => {
    let latitude = request.body.latitude
    let longitude = request.body.longitude
    var email=request.body.email;
    let hash = crypto.createHash('md5').update(email).digest("hex")
    var refer = firebase.database().ref('vendingmachines');

    var ref_vm = firebase.database().ref('vendingmachines/'+hash);
    var ref_vm_set = firebase.database().ref('vendingmachines/'+hash);
    var vm_id = 0
    var real_vm = 0
    ref_vm.once("value", function(snapshot) {       
            vm_id = snapshot.child('vm_number').val()+1
            real_vm = snapshot.child('vm_real').val()
            console.log([vm_id,real_vm])
    }).then(function(){
        console.log("WTF2")
        firebase.database().ref('vendingmachines/' + hash+'/vm/'+vm_id).set({
            vm_id: vm_id,
            latitude: latitude,
            longitude:  longitude,
            sales: 0,
        }).then(function(){
            console.log("WTF3")
            ref_vm_set.update({
                vm_real : real_vm+1,
                vm_number : vm_id
            }).catch(function(error){

            }).then(function(){
                response.send(''+vm_id)
            })
        })})
});

routes.post('/updatevm', (request, response) => {
    let latitude = request.body.latitude
    let longitude = request.body.longitude
    var email=request.body.email;
    var vm_id = request.body.vm_id
    let hash = crypto.createHash('md5').update(email).digest("hex")
    var refer = firebase.database().ref('users');

    var ref_vm = firebase.database().ref('users/'+hash);
    var ref_vm_set = firebase.database().ref('users/'+hash);

    firebase.database().ref('vendingmachines/' + hash+'/vm/'+vm_id).update({
        latitude: latitude,
        longitude:  longitude
    }).then(function(){
        response.send('update success!')
    }).catch(function(error){
        if(error){
            console.log('update fail: '+ error);
        }
    });
});

routes.delete('/deletevm',(request,response)=>{
    let vm_id = request.body.vm_id
    let email=request.body.email;
    let hash = crypto.createHash('md5').update(email).digest("hex")
    firebase.database().ref('vendingmachines/'+hash+'/vm/'+vm_id).remove()
                .then(function(){
                    console.log('success');
                    let vm_num = -1
                    firebase.database().ref('vendingmachines/'+hash).once('value',function(snapshot){
                        vm_num = snapshot.child("vm_real").val()
                        console.log('holy jesus')
                    }).then(function(){
                        firebase.database().ref('vendingmachines/'+hash).update({
                            vm_real:vm_num-1
                        })
                        console.log(vm_num)

                        response.send('Holy Jesus')
                    })
                })
                .catch(function(error){
                    console.log('Remove fail: '+ error);
                });
})

routes.post('/getallvm', (request, response)=>{
    let email = request.body.email;
    let hash = crypto.createHash('md5').update(email).digest("hex");

    var ref = firebase.database().ref('vendingmachines/'+hash);

    var allvm;

    ref.once('value', function(snapshot){
        allvm = snapshot.child('vm');
    }).then(function(){
        response.send(allvm);
    }, function(error){
        response.send('Error: ' + error);
    });
})



module.exports = routes;