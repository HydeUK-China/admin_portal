import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link, Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import Tab from '../components/tab';
import Footer from './Footer';
import { removeRole, getRole, fetchReq } from '../utils/utils';
import { path_name, renderRoute } from './tabRouteConfig';

import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: getRole()
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  getTabs = () => {
    const { role } = this.state;
    const pick_tabs = path_name(role)

    return _.map(pick_tabs, (item, index) => {
      return (
        <div key={`tabs-${index}`}>
          <Tab path={item.path} name={item.name} />
        </div>
      )
    })
  }

  handleLogout(e) {
    e.preventDefault();

    fetchReq('/api/logout')
      .then(data => {
        removeRole();
        this.props.history.push('/login')
      }).catch(msg =>
        alert(msg)
      )
  }


  render() {
    const { role } = this.state;

    return (
      <div>
        <div id="top" className="category-hero">
          <div className="header">
            <div className="brand-container">
              <Link className="brand" to="/admin/admin_dashboard">
                Hyde International Talents
                  </Link>
            </div>

            <nav className="main-nav">
              <div className="sign-in">
                <div className="nav-item user" onClick={this.handleLogout}>
                  Logout
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="main-box">
          <div className="admin-platform">
            Hyde International Talents (HIT) Admin Portal
              <hr></hr>
            {this.getTabs()}
          </div>

          <div className="container">
            <div className="welcome-admin">Welcome to Hyde International Talents (HIT) Admin Portal</div>
            <Switch>
              {renderRoute(role)}
              <Route path="/mgt">
                { role === '__admin__' ?
                  <Redirect to='/mgt/admin_dashboard' />
                  : <Redirect to='/mgt/project_management' />
                  }
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
