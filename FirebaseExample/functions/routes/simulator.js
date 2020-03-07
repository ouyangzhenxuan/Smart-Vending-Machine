const routes = require('express').Router();
// const express = require('express');
var firebase = require('firebase');
const crypto = require('crypto')
var nodemailer = require('nodemailer');


routes.post('/order', (request, response)=>{
    var itemName = request.body.item;
    var itemAmount = request.body.amount;
    var email = request.body.email;
    var vm_id = request.body.vm_id;

    console.log(itemName)
    console.log(itemAmount)
    console.log(email)
    console.log(vm_id)

    let hash = crypto.createHash('md5').update(email).digest("hex")
    
    var newItemAmount = 0;
    var newItemInventory = 0;

    console.log(itemName);

    var ref = firebase.database().ref('vendingmachines/' + hash + '/vm/' + vm_id + '/products');
    ref.once("value", function(snapshot){
        if(snapshot.child(itemName).child('inventory').val() < 1){
            response.send('fail to order because there is no inventory for this product');
            
        }       
        newItemAmount = snapshot.child(itemName).child('sales').val() + parseInt(itemAmount);
        newItemInventory = snapshot.child(itemName).child('inventory').val() - parseInt(itemAmount);
    }).then(function(){
        firebase.database().ref('vendingmachines/' + hash + '/vm/' + vm_id + '/products/' + itemName)
        .update({
            sales: newItemAmount,
            inventory: newItemInventory
        });
        response.send('success');
    }, function(error){
        response.send('fail to order');
    });

    
    
})

module.exports = routes;