import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function SignUp(){
    const state = {
        email:""
    }
    const pins = {
        email:"",
        pin:"",
        password:""
    }
    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        state[name]=value;
        pins[name]=value
      }
      const pinHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        pins[name]=value;
      }

    const sendHandler = (e) =>{

        console.log(state)
        document.getElementsByClassName("pinfield")[0].hidden = false;
        document.getElementsByClassName("pinfield")[1].hidden = false;
        document.getElementsByClassName("pinfield")[2].hidden = false;
        document.getElementById("emailb").hidden= true;
        document.getElementById("submitb").hidden= false;
        axios.post("https://vending-insights-smu.firebaseapp.com/sendEmail",state)
         .then(response => {
                console.log(response)
            }).catch(error => {console.log(error)})
    }
    const submitHandler = (e) =>{
        console.log(pins)

        axios.post("https://vending-insights-smu.firebaseapp.com/changePassword",pins)
         .then(response => {
            if(response.data == '200'){
              window.location.href = '/';
            }
            }).catch(error => {console.log(error)})
    }
  const classes = useStyles();


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Enter Your Email Address
        </Typography>
        <form className={classes.form} noValidate 
            >
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Please Enter Your Email Address"
                name="email"
                autoComplete="email"
                onChange= {changeHandler}
              />
            </Grid>
            <Grid item xs={12} className = 'pinfield' hidden={true} >
              <TextField
                autoComplete="cname"
                name="pin"
                variant="outlined"
                required
                fullWidth
                id="pin"
                label="Enter Your PIN"
                autoFocus
                onChange= {pinHandler}
              />
            </Grid>
            <Grid item xs={12} className = 'pinfield' hidden={true}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange= {changeHandler}
              />
            </Grid>
            <Grid item xs={12} className = 'pinfield' hidden={true}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Comfirm New Password"
                type="password"
                id="changePassword"
              />
            </Grid>
          </Grid>
          <Button
          onClick = {sendHandler}
            fullWidth
            color = 'secondary'
            variant="contained"
            id = "emailb"
            className={classes.submit}
            hidden = {false}
          >
            Send to Email
          </Button>
          <Button
          onClick = {submitHandler}
            fullWidth
            color = 'secondary'
            variant="contained"
            id = "submitb"
            className={classes.submit}
            hidden = {true}
          //  href='\'
          >
            Submit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="\" variant="body2">
                Back to Login Page
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}