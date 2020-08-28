import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import App from './App/App';
import Login from './pages/Login';
import {isLoggedIn} from './utils/utils';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/login">
          <Login />
        </Route>
        <Route path="/admin">
          { isLoggedIn() ? <App /> : <Redirect to="/admin/login" />}
        </Route>
        {/* fallback route */}
        <Route path="/">
          <Redirect to="/admin/admin_dashboard" />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
