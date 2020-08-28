import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link, Redirect
} from 'react-router-dom';
import {withRouter} from 'react-router';
import _ from 'lodash';
import Tab from '../components/tab';
import Footer from './Footer';
import Dashboard from '../pages/Dashboard';
import ExpertDatabase from '../pages/ExpertDatabase';
import ProjectPorposal from '../pages/ProjectPorposal';
import ExpertAssessment from '../pages/ExpertAssessment';
import {logout} from '../utils/utils';

import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      { path: 'admin_dashboard', name: 'Dashboard' },
      { path: 'admin_expert_database', name: 'Expert Database' },
      { path: 'project_proposal_collaboration', name: 'Project Porposal' },
      { path: 'expert_assessment', name: 'Expert Assessment' }
    ]

    this.handleLogout = this.handleLogout.bind(this);
  }

  getTabs(tabs) {
    return _.map(tabs, (item, index) => {
      return (
        <div key={`tabs-${index}`}>
          <Tab path={item.path} name={item.name} />
        </div>
      )
    })
  }

  handleLogout(e){
    e.preventDefault();

    logout();
    const props = this.props;
    props.history.push('/admin/login')
  }


  render() {
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
            {this.getTabs(this.tabs)}
          </div>

          <div className="container">
            <div className="welcome-admin">Welcome to Hyde International Talents (HIT) Admin Portal</div>
            
            <Route path="/admin/admin_dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/admin_expert_database">
              <ExpertDatabase />
            </Route>
            <Route path="/admin/project_proposal_collaboration">
              <ProjectPorposal />
            </Route>
            <Route path="/admin/expert_assessment">
              <ExpertAssessment />
            </Route>
            {/* fallback route */}
            <Route path="/admin">
              <Redirect to="/admin/admin_dashboard" />
            </Route>
          
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      get: '',
      name: '',
      param: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetSubmit = this.handleGetSubmit.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleGetSubmit(event) {
    event.preventDefault();
    fetch(`/api/get?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  handlePostSubmit = (event) => {
    event.preventDefault();

    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.param })
    })
      .then(response => response.text())
      .then(body => this.setState({ post: body }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleGetSubmit}>
          <label htmlFor="name">Test GET Request: </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.get}</p>


        <form onSubmit={this.handlePostSubmit}>
          <label htmlFor="name">Test POST Request: </label>
          <input
            type="text"
            value={this.state.param}
            onChange={e => this.setState({ param: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.post}</p>
      </div>
    );
  }
}

export default withRouter(App);
