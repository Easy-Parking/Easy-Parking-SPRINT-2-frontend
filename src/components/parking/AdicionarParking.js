import React, { Component } from 'react';
import clsx from 'clsx';

import DraggableLayouts from "../../components/parkingDraggable/DraggableLayouts";
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';


import { withStyles } from "@material-ui/core/styles";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class AdicionarParking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : this.props.user, //recibir usuario de adminPage
            steps : ['Adicione el Nombre del Establecimiento', 
                    'Adicione el numero del piso', 
                    'Cree Su Parking'
                    ],
            activeStep : 0,
            nameParking : "",
            pisoParking: 0
        }

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getStepContent(step) {
        const { classes } = this.props;
        switch (step) {
            case 0:
                return(
                    <div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                name="nameParking"
                                variant="outlined"
                                required
                                fullWidth
                                id="nameParking"
                                label="Nombre Parqueadero"
                                autoFocus
                                value={this.state.nameParking}
                                onChange={this.handleChange}
                            />
                        </form>
                    </div>
                )
            case 1:
                return(
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Piso</InputLabel>
                            <Select
                                name="pisoParking"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.pisoParking}
                                onChange={this.handleChange}
                                label="Piso"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Uno</MenuItem>
                            <MenuItem value={2}>Dos</MenuItem>
                            <MenuItem value={3}>Tres</MenuItem>
                            <MenuItem value={4}>Cuatro</MenuItem>
                            <MenuItem value={5}>Cinco</MenuItem>
                            <MenuItem value={6}>Seis</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                )
            case 2:
                return(
                    <div>
                        Darle en "ADD ITEM" y empezar a acomodar los objetos modelando su esquema de Parqueadero
                        de acuerdo a su arquitectura o planos.
                        <div>
                          <DraggableLayouts name = {this.state.nameParking} piso = {this.state.pisoParking} user = {this.state.user}/>
                        </div>
                        <br/>
                        <br/>
                        
                    </div>
                )
            default:
                return 'Unknown step';
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleNext = () => {
        this.setState({activeStep : this.state.activeStep + 1});
      };
    
    handleBack = () => {
        this.setState({activeStep : this.state.activeStep - 1});
      };
    
    handleReset = () => {
        this.setState({activeStep : 0});
      };    

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {this.state.activeStep === this.state.steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </div>
        )
    }
}



const styles = theme=> ({
    root: {
        width: '100%',
      },
      button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      actionsContainer: {
        marginBottom: theme.spacing(2),
      },
      resetContainer: {
        padding: theme.spacing(3),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
});


export default withStyles(styles, { withTheme: true })(AdicionarParking);