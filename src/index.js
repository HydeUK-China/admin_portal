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
        {/* fallback route */}
        <Route path="/">
          <Redirect to="/mgt" />
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
