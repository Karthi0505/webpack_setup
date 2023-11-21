import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import './styles/App.scss';
import FishIcon from './images/fish_icon.png';
import Crab from './images/crab.jpg';
import Vanjaram from './images/vanjaram.jpg';
import Fish2 from './images/yellow-fishes.jpg';
import Fish3 from './images/grill-fishes.jpg';
import Fish4 from './images/cut-fishes.jpg';

import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";


import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
/*import Dashboard from "./components/dashboard/Dashboard";*/

import { setCurrentUser, logoutUser, loginUser } from "./actions/authentication/authActions";
import LoginLink from "./components/header/LoginLink";

 


// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
}
  

//feature 1
class App extends Component {
    render() {        
        
        return ( 
            <Provider store={store}>
              <BrowserRouter>
                  <div className="App grid-container">

                     <header>
                       <div className="container d-flex align-items-center justify-content-between"> 
                           <Link to="/">
                              <img src={FishIcon} alt="Kadal to Kitchen logo" />
                           </Link>                       
                           
                            <div className="d-flex align-items-center">
                                <Link to="/admin" className="text-light mx-2">Admin</Link>
                                <LoginLink />
                            </div>
                                                 
                           
                        </div>
                     </header>
                     <main>
                        <Route path="/admin" component={AdminScreen} />
                        <Route path="/" component={HomeScreen} exact />
                        
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        {/*<Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>*/}
                     </main>
                     
                     <footer className="d-flex justify-content-center align-items-center">
                           <p>All right is reserved</p>
                     </footer>
                  </div>
              </BrowserRouter>
          </Provider>
        );
    }
}

export default App;