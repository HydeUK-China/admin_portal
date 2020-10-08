import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import App from './App/App';
import Login from './pages/Login';
import {getRole} from './utils/utils';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import ApplyJob from './pages/ApplyJob';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/mgt">
          <App />
        </PrivateRoute>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/jobs">
          <Jobs />
        </Route>
        <Route exact path="/applyjob/:projectId">
          <ApplyJob />
        </Route>
        <Route exact path="/contactus">
          <Login />
        </Route>
        <Route exact path="/aboutus">
          <Login />
        </Route>
        {/* fallback route */}
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(location) => getRole() != null
        ? children
        : <Redirect to={{ pathname: '/login'}} />}
    />
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
