import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  getRole } from '../utils/utils';
import '../styles/topNav.css'


export default class topNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      role: getRole(),
      projectData: []
    }

  }


  render() {
    const role = this.state;
    console.log("current role "+ role)
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top navbar-transperent">
        <NavLink className="navbar-brand" to="/home">HI Talents</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contactus">Contact Us</NavLink>
            </li>
            <li className="sign-in">
                                {role === '__admin__' ?
                                    <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                        <div className="fa fa-user-o"></div>
                                    </NavLink>
                                    :
                                    (role === 'expert' ?
                                        <NavLink className="nav-item user" to="/mgt/expert_profile">
                                            <div className="fa fa-user-o"></div>
                                        </NavLink>
                                        : <NavLink className="nav-item user" to="/login">
                                            <div className="fa fa-user-o"></div>
                                        </NavLink>)
                                }
                            </li>
          </ul>
        </div>
      </nav>
    </div>
    );
  }
}
