import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ParticlesBg from 'particles-bg';

import { Redirect } from 'react-router-dom';



class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toSignup: false,
            email: "",
            password: "",
            name: "",
            firstName: "",
            lastName: "",
            rol: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleToSignup = this.handleToSignup.bind(this);

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

    handleToSignup = () => {
        this.setState({toSignup : true});
    }


    async registerUser() {
        console.log(this.state.rol.length);
        if (this.state.email === "" &&
            this.state.password === "" &&
            this.state.firstName === "" &&
            this.state.lastName === "" &&
            this.state.rol.length === 0) {
            Swal.fire("Empty field!", "Please, fill all the fields", "error");
        } else {
            if (this.state.email.includes('@')) {
                if (this.state.password.length >= 6) {
                    let res = await axios.post('https://backend-easyparking.herokuapp.com/users/save/', {
                        name : this.state.firstName +" "+ this.state.lastName,
                        rol :  this.state.rol,
                        email : this.state.email,
                        password : this.state.password
                      })
                      .then(function (response) {
                        console.log(response.status);
                        console.log(response.data);
                          if(response.status===200){
                            Swal.fire(
                                'Cuenta creada satisfactoriamente!',
                                'Sera redireccionado a la pagina de inicio de sesion',
                                'success'
                            ).then(function (result)  {
                                if (result.value) {
                                    
                                }
                              });

                            
                          }else{
                            Swal.fire("Signup failed!", "try again later", "error");
                          }
                        
                      })
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

        this.handleToSignup();

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.toSignup && <Redirect to='/login'></Redirect>}
                <ParticlesBg color="#7C00C8" type="circle" bg={true} />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={this.state.firstName} 
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        value={this.state.lastName} 
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={this.state.email} 
                                        onChange={this.handleChange}
                                    />
                                </Grid>
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

                                <FormControl variant="outlined" className={classes.margin, classes.textField}>
                                    <InputLabel id="demo-simple-select-outlined-label">Rol</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="rol"
                                        label="Rol"
                                        value={this.state.rol}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"administrador"}>Administrador</MenuItem>
                                        <MenuItem value={"usuario normal"}>Usuario Normal</MenuItem>
                                    </Select>
                                </FormControl>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.registerUser}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2" className={classes.link}>
                                        Already have an account? Sign in
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
        marginTop: theme.spacing(3),
        
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

export default withStyles(styles, { withTheme: true })(SignUp);