import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/login/Login';
import Signup from './views/signUp/SignUp';
import HomePage from './views/homePage/HomePage';
import AdminPage from './views/adminPage/AdminPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/adminpage' component={AdminPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
