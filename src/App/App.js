import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link, Redirect, NavLink
} from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import Tab from '../components/tab';
import { Navbar } from 'react-bootstrap';
import { removeUserInfo, getRole, getUid, fetchReq } from '../utils/utils';
import { path_name, renderRoute } from './tabRouteConfig';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';
import '../styles/database.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: getRole(),
      uid: getUid(),
      navbarToggler: false,
      showWarning: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.completeAppMsger = this.completeAppMsger.bind(this);
  }

  toggleNavbar() {
    this.setState({
      navbarToggler: !this.state.navbarToggler
    })
  }

  completeAppMsger(applicationComplete) {
    this.setState({
      showWarning: applicationComplete === 'Y' ? false : true
    })
  }

  getTabs() {
    const { role, uid, showWarning } = this.state;
    const pick_tabs = path_name(role, uid, this.completeAppMsger);

    const links = _.map(pick_tabs, (value, key) => {
      return (<Tab key={`tabs-${key}`}
        path={value.path}
        name={value.name}
        icon={value.icon}
        showWarning={key === 'expert_application' && showWarning} />)
    });

    return (
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            {links}
          </ul>
        </div>
      </div>
    )
  }

  handleLogout(e) {
    e.preventDefault();

    fetchReq('/api/logout')
      .then(data => {
        removeUserInfo();
        this.props.history.push('/login')
      }).catch(msg =>
        alert(msg)
      )
  }

  render() {
    const { role, uid, navbarToggler } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <Link className="navbar-brand" to='/mgt'>HI TALENTS</Link>
          <button className="navbar-toggler" onClick={this.toggleNavbar}
            type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={navbarToggler ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contactus">Contact</NavLink>
              </li>
              <li className="nav-item">
                <div className="nav-link Signout bg warning">
                  <i className="fas fa-sign-out-alt" onClick={this.handleLogout}></i>
                </div></li>
              <li className="nav-item">
                <div className="nav-link Signout bg warning">
                  <i className="fas fa-sign-out-alt" onClick={this.handleLogout}></i>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {/* <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" expand="lg">
          <Navbar.Brand>
            <Link className="navbar-brand" to='/mgt'>HYDE INTERNATIONAL</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <div className="nav-link" onClick={this.handleLogout}>Sign Out</div>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar> */}

        <main>
          <div className="container-fluid">
            <div className="row">
              {this.getTabs()}
            </div>

            <Switch>
              {renderRoute(role, uid, this.completeAppMsger)}
              <Route path="/mgt">
                {role === '__admin__' ?
                  <Redirect to='/mgt/admin_dashboard' />
                  : <Redirect to='/mgt/expert_profile' />
                }
              </Route>
            </Switch>
          </div>


        </main>
      </div>
    );
  }
}

export default withRouter(App);
