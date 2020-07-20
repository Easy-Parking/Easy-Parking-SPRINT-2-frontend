import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/login/Login';
import Signup from './views/signUp/SignUp';
import HomePage from './views/homePage/HomePage';
import AdminPage from './views/adminPage/AdminPage';
import NormalUserPage from './views/normalUserPage/NormalUserPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={HomePage} exact ></Route>
        <Route path='/login' component={Login} exact ></Route>
        <Route path='/signup' component={Signup} exact ></Route>
        <Route path='/adminpage' component={AdminPage} exact ></Route>
        <Route path='/normalUserPage' component={NormalUserPage} exact ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
