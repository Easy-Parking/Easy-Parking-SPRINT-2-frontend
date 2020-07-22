import React, { Component } from 'react';
import clsx from 'clsx';

import Swal from 'sweetalert2';

import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import { withStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';


import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


class NormalUserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toSignup: false,
            email: "",
            password: "",
            user: "",
            open: false
        }

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const validateSession = Cookies.getJSON('user');
        console.log("user", validateSession);
        console.log("respuesta ", validateSession === undefined)
        if (validateSession === undefined) {
            console.log("entro xd ", true)
            this.setState({authenticated : true});

        } else {
          if(validateSession.rol !== "usuario normal"){
            this.setState({authenticated : true});
          }else{
            this.setState({user : validateSession});
            console.log("user", validateSession);
            console.log("Access granted, session active!");
          }

        }
    }

    async logout() {
      await Cookies.remove('user', { path: '' });
      Swal.fire(
        'Sesion Finalizada',
        'success'
      );
    
      this.setState({authenticated : true});
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };
  


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: this.state.open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Easy Parking 
                </Typography>
                
                <Button className={classes.login} onClick={this.logout} color="secondary" variant="contained">Log out <br/> {this.state.user.name}</Button>
                

              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  {classes.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                {['ver parking'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div>
                        <div>
                            {this.state.authenticated && <Redirect from="/normalUserPage" to='/login'></Redirect>}
                        </div>
                    </div>
                </main>
            </div>
            

        )
    }
}
const drawerWidth = 240;


const styles = theme=> ({
    root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      login: {
        marginLeft: "auto",
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
});


export default withStyles(styles, { withTheme: true })(NormalUserPage);