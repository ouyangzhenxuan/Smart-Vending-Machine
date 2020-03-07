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
        originalPassword:'',
        password:'',
        cpassword:''
    }
    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        state[name]=value;
      }
    const submitHandler = (e) =>{
        // axios.post("https://vending-insights-smu.firebaseapp.com/signup",state)
        //  .then(response => {
        //         console.log(response)
        //     }).catch(error => {console.log(error)})
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
          <Grid item xs={12} >
              <TextField
                autoComplete="opassword"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="originalPassword"
                label="Original Password"
                autoFocus
                onChange= {changeHandler}
              />
            </Grid>
          <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Comfirm New Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
          onClick = {submitHandler}
            fullWidth
            color = 'secondary'
            variant="contained"
            className={classes.submit}
          >
            Confirm Change
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