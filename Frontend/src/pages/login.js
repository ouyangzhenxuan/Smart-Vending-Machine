import React from 'react';

// import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../assets/img/bg/img2.jpeg';
import axios from 'axios';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          SW Vault{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const state = {
    email:"",
    password:""
}
    const error = {
        iserror : false,
        errormsg: "Invalid Email Address or Password"
    }
    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        state[name]=value;
    }

    const getallvm = (props) =>{
      var vmdata = {
        "1":{
          longitude: 1,
          latitude: 2,
          sales: 3
        }
      };
      for(var i=0; i<vmdata.length; i++){
        console.log(vmdata[i]);
      }
      const data = vmdata.map((i)=>i);
      console.log(data);
    }


    const submitHandler = (props) =>{
        console.log(state)
        axios.post("https://vending-insights-smu.firebaseapp.com/user/login",state)
        .then(response => {
          console.log(response)
                if(response.data === 'okay'){
                    window.location.href = '/dashboard';
                    // props.history.push('/dashboard');
                }
                else{
                    document.getElementsByClassName("error")[0].hidden = false;
                     
                }

            }).catch(error => {console.log(error)});
        
    }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate 
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange= {changeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange= {changeHandler}
            /><div>
            <span className='error' hidden={true} align='left' color='red'>{error.errormsg}</span></div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
            onClick = {function(){submitHandler();getallvm();}}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs >
                <Link href="\check_email" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="\signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}