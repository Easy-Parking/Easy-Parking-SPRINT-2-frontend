import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';

import DraggableLayouts from "../../components/parkingDraggable/DraggableLayouts";

import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import { withStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';



class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toSignup: false,
            email: "",
            password: "",
            open: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

  
    handleOpen(){
        this.setState({open:true});
    };
  
    handleClose(){
        this.setState({open:false});
    };

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
            <Modal
            disableScrollLock
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={this.state.open}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Transition modal</h2>
                  <p id="transition-modal-description">react-transition-group animates me.</p>
                  <Button variant="outlined" color="primary" onClick={this.handleClose}>
                        Show backdrop
                    </Button>
                  <DraggableLayouts />
                </div>
              </Fade>
            </Modal>
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


export default withStyles(styles, { withTheme: true })(HomePage);