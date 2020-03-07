import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import color from '@material-ui/core/colors/amber';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import picture from '../pictures/Mona-Lisa-256x256.jpg';

// global value
var email = 'jinxund@smu.edu'
var vm_id = 46

class Simulator extends React.Component{

    constructor(props){
        super();
        this.state = {
            orderItem: '',
            orderAmount: 1,
            price: 0,
            vm_id: vm_id,
            email: email,

            orderInfo:{
                orderItem: '',
                orderAmount: 1,
                price: 3,
            },

            itemArray: [
                {
                    id: 1,
                    item: "Coke", 
                    price: 2
                },
                {
                    id: 2,
                    item: "Sprite", 
                    price: 3
                }
            ],

            
        }
    }

    changeHandler = () => {

    }

    increaseAmount = () => {
        this.setState((prevState, props)=>
            ({
                orderInfo:{
                    ...prevState.orderInfo,
                    orderAmount: this.state.orderInfo.orderAmount + 1
                },

                orderAmount: this.state.orderAmount + 1
            })
        )
        console.log(this.state)
        console.log(this.state.orderInfo.orderAmount)
    }

    decreaseAmount = () => {
        
        if(this.state.orderInfo.orderAmount > 1){
            this.setState(
                {
                    orderInfo:{
                        orderAmount: this.state.orderInfo.orderAmount - 1
                    },

                    orderAmount: this.state.orderAmount - 1
                    
                }
            )
        }
        console.log(this.state)
        console.log(this.state.orderInfo.orderAmount)
    }

    itemChange = event => {
        console.log(event)
        axios.post('http://localhost:5000/price/pricefromdb', {
            email: this.state.email,
            vm_id: this.state.vm_id,
            item: event.target.value
        })
        .then(response=>{
            console.log(response.data)
            if(response.data !== ''){
                this.setState({
                    price: parseInt(response.data)
                })
            }else{
                console.log('fail to update price');
            }
        }).then(()=>{
            this.setState({ 
                [event.target.name]: event.target.value
            });
            this.setState((prevState, props)=>({
                orderInfo: {
                    ...prevState.orderInfo,
                    [event.target.name]: event.target.value
                }
            })
            );
        }).then(()=>{
            console.log(this.state.orderInfo)
        });
    
        
    }

    confirmPurchase = () => {
        console.log(this.state.orderItem)
        console.log(this.state.orderAmount)
        console.log(this.state.orderInfo)
        axios.post('http://localhost:5000/simulator/order', this.state.orderInfo)
        .then(response=>{
            if(response.data === 'success'){
                alert('purchase done!')
            }else{
                alert('fail to purchase!')
            }
        });
    }

    render(){
        return(
            <div>
                
                <div>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Item</InputLabel>
                        <Select 
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={this.itemChange}
                                value={this.state.orderItem}
                                name='orderItem'>
                            {/* <MenuItem value={'Coke'}>Coke</MenuItem>
                            <MenuItem value={'Sprite'}>Sprite</MenuItem> */}
                            {/* <MenuItem value={'Water'}>Water</MenuItem> */}
                            {
                                this.state.itemArray.map((row, index)=>{
                                    return(
                                        <MenuItem key={row.id} value={row.item}>{row.item}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <label>Quantity: </label><br />
                    <input type='text' value={this.state.orderInfo.orderAmount} onChange={this.changeHandler} readOnly align='center'/>
                    <button className='btn-secondary' onClick={this.increaseAmount}>+</button>
                    <button className='btn-secondary' onClick={this.decreaseAmount}>-</button>
                </div>

                <div>
                    price: ${this.state.price}
                </div>

                <div>
                    <button className='btn-primary' onClick={this.confirmPurchase}>Confirm purchase</button>
                </div>
                
                <div>
                    <img src={picture} alt="pic"></img>
                </div>
            </div>
        );
    }
    
}

export default Simulator;