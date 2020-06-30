import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';

import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import { withStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';



class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toSignup: false,
            email: Cookies.getJSON('user').email,
            password: "",
            open: false
        }
    }

    componentDidMount() {
        const validateSession = Cookies.getJSON('user');
        if (!validateSession) {
            return (
                <Redirect to='/'></Redirect>
            )
        } else {
            console.log("cookie: ", validateSession.email);
            this.setState({email:validateSession.email});
            console.log("email:", this.state.email);
            console.log("Access granted, session active!");
        }
    }

  


    render() {
        const { classes } = this.props;
        return (
            
            <div>
                <div>
                <ParticlesBg color="#7C00C8" type="cobweb" bg={true} />
                </div>
            <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                Show backdrop
            </Button>
          </div>
        )
    }
}

const styles = theme=> ({
    modal: {

      alignItems: 'center',
      justifyContent: 'center',


    },
    paper: {
      backgroundColor: "#ff00",
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),

      textAlign: "center",
      margin: "0 auto",
      padding: "1em",
    }
});


export default withStyles(styles, { withTheme: true })(AdminPage);