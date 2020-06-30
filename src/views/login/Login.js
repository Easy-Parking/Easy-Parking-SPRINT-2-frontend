import React, { Component } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ParticlesBg from 'particles-bg';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';




class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            email: "",
            password: "",
            showPassword: false,
            rol: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.loginUser = this.loginUser.bind(this);

    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleClickShowPassword = () => {
        this.setState({showPassword : !this.state.showPassword});
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    async loginUser() {
      if (this.state.email === "" &&
          this.state.password === "") {
          Swal.fire("Empty field!", "Please, fill all the fields", "error");
      } else {
          if (this.state.email.includes('@')) {
              if (this.state.password.length >= 6) {
                  let res = await axios.get('https://backend-easyparking.herokuapp.com/users/byEmail/'+this.state.email)
                    .then(response => {
                      console.log(response.status);
                      console.log(response.data);
                        if(response.status===200){
                          Cookies.set('user', response.data);
                          Swal.fire(
                              'Bienvenido '+response.data.name,
                              'Sera redireccionado al dashboar de '+response.data.rol,
                              'success'
                          ).then(function (result)  {
                              if (result.value) {
                                  
                              }
                            });
                            
                        }else{
                          Swal.fire("Signup failed!", "try again later", "error");
                        }
                      
                    },
                    this.setState({ authenticated: true })
                    )
                    .catch(function (error) {
                      console.log(error);
                    });
              } else {
                  Swal.fire("Short password!", "The password should be at least 6 digits", "error");
              }
          } else {
              Swal.fire("Not an email!", "Please, type a correct email", "error");
          }
      }

      

  }



    render() {
        const { classes } = this.props;
        return (
          <div>
            {this.state.authenticated && <Redirect to='/adminpage'></Redirect>}
            <ParticlesBg color="#7C00C8" type="circle" bg={true} />
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                        </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.email} 
                    onChange={this.handleChange}
                  />
                  <FormControl className={classes.margin, classes.textField} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      name="password"
                      autoComplete="off"
                      onChange={this.handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>

                      }
                      labelWidth={70}
                    />
                  </FormControl>

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.loginUser}
                  >
                    Sign In
                            </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/signup" variant="body2" className={classes.link}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </div>
        )
    }
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#7C00C8',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  link: {
    color: "white",
  }
});

export default withStyles(styles, { withTheme: true })(Login);
