import React, { Component,Fragment } from 'react';
import {
  Switch,
  Route,
  Link, Redirect, NavLink
} from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import Tab from '../components/tab';
import { removeUserInfo, getRole, getUid, fetchReq } from '../utils/utils';
import { path_name, renderRoute } from './tabRouteConfig';
import '../styles/app.css';
import '../styles/database.css';
import ReactGA from 'react-ga';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    ReactGA.initialize('G-JK3NHS5DHQ')

    return (
      <Fragment>

        {/* Nav Bar */}
        <div className='navDashboard'>
          <nav className="navbar navbar-expand-lg navbar-light bg-transperent sticky-top px-3 text-dark">
            <NavLink className="navbar-brand " to="/home" title='Hi Talents'><h2>HI Talents</h2></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home" title='Home'>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/jobs" title='Jobs'>Jobs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/aboutus" title='About Us'>About Us</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contactus" title='Contact Us'>Contact Us</NavLink>
                </li>
                <li className="nav-item">
                  <div className="nav-link Signout bg warning">
                    <ExitToAppIcon onClick={this.handleLogout} />
                  </div>
                </li>
              </ul>

            </div>
          </nav>
        </div>

        <div className="containerBox">
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



      </Fragment>
    );
  }
}

export default withRouter(App);
