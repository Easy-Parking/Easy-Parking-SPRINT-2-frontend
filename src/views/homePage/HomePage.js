import React, { Component } from 'react';

import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import logo from '../../images/homePage/logoSinNombre.png';



class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      toSignup: false,
      dashboardAdmin: false,
      dashboardAdmin2: false,
      dashboardUserNormal: false,
      email: "",
      password: "",
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginRedirect = this.loginRedirect.bind(this);
    this.dashboardRedirect = this.dashboardRedirect.bind(this);

  }

  async componentDidMount() {
    const validateSession = Cookies.getJSON('user');
    console.log("user", validateSession);
    console.log("respuesta ", validateSession == undefined)
    if (validateSession == undefined) {
        console.log("entro xd ", true)
        this.setState({authenticated : false});

    } else{
        this.setState({user : validateSession});
        console.log("user", validateSession);
        console.log("Access granted, session active!");
      } 
}

  async logout() {
    await Cookies.remove('user');
    Swal.fire(
      'Sesion Finalizada',
      'success'
    );
    this.setState({authenticated : false});
  }  

  async loginRedirect() {
    if(this.state.authenticated){ //ya esta logueado
      this.logout();
    }else{
      this.setState({toSignup : true});
    }
  }

  async dashboardRedirect() {
    if(this.state.user.rol == "administrador"){
      this.setState({ dashboardAdmin: true });
    }
    else if(this.state.user.rol == "administrador 2"){
      this.setState({ dashboardAdmin2: true });
    }
    else if(this.state.user.rol == "usuario normal"){
      this.setState({ dashboardUserNormal: true });
    }
  };

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    let login;
    let buttonDashboard;
    if (this.state.authenticated) {
      login = "Logout";
      buttonDashboard = <Button onClick={this.dashboardRedirect} color="primary" variant="contained" className={classes.link}> Dashboard </Button> ;
    } else {
      login = "Login";
      buttonDashboard = "";
    }
    return (
      <div>
        {this.state.toSignup && <Redirect to='/login'></Redirect>}
        {this.state.dashboardAdmin && <Redirect to='/adminpage'></Redirect>}
        {this.state.dashboardAdmin2 && <Redirect to='/adminpage2'></Redirect>}
        {this.state.dashboardUserNormal && <Redirect to='/normalUserPage'></Redirect>}
        <CssBaseline />
        <AppBar position = "sticky"  color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
          <img src={logo} width="50px" height="50px" margin="auto" alt="Logo" />
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              EASY PARKING
            </Typography>
            {buttonDashboard}
            <Button onClick={this.loginRedirect} color="secondary" variant="contained" className={classes.link}>
              {login}
          </Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Pricing
        </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Quickly build an effective pricing table for your potential customers with this layout.
            It&apos;s built with default Material-UI components with little customization.
        </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                    </Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container spacing={4} justify="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" variant="subtitle1" color="textSecondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* End footer */}


      </div>
    )
  }
}

const styles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    margin: theme.spacing(1, 1.5),
    fontWeight: "bold"
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    }
  }
});

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


export default withStyles(styles, { withTheme: true })(HomePage);