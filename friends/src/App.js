import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import LoginComponent from './components/LoginComponent';
import FriendsComponent from "./components/FriendsComponent";

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/"/>
      )
    }
    />
);


function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Login Here!</Link>
          </li>

          <li>
            <Link to="/friends">Friends Page</Link>
          </li>

        </ul>
        <Route exact path="/" component={LoginComponent}/>
        <PrivateRoute path="/friends" component={FriendsComponent}/>
      </div>
    </Router>
  );
}

export default App;
