import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole } from '../../utils/utils';
import Footer from '../../components/Footer';

import '../../styles/contactus.css';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
          role: getRole()
        }

    }

    render() {
      const { role } = this.state;
        return (
                <div>
                  <section id="top" className="contact-header">
                      <div className="side-image">
                      </div>
                      <header id="header">
                        <div className="brand-container">
                            <Link className="brand" to="/home">
                                HI Talents       
                            </Link>
                        </div>

                        <nav className="main-nav">
                            <NavLink className="nav-item" to="/home" style={{color: 'black'}}>Home</NavLink>
                            <NavLink className="nav-item" to="/jobs" style={{color: 'black'}}>Jobs</NavLink>
                            <NavLink className="nav-item" to="/aboutus" style={{color: 'black'}}>About</NavLink>
                            <NavLink className="nav-item" to="/contactus" style={{color: 'black'}}>Contact</NavLink>
                            <div className="sign-in">
                            {role === '__admin__' ?
                                <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                    <div className="fa fa-user-o" style={{color: 'black'}}></div>
                                </NavLink>
                                : 
                                (role === 'expert' ? 
                                    <NavLink className="nav-item user" to="/mgt/expert_profile">
                                        <div className="fa fa-user-o" style={{color: 'black'}}></div>
                                    </NavLink>
                                    : <NavLink className="nav-item user" to="/login">
                                        <div className="fa fa-user-o" style={{color: 'black'}}></div>
                                      </NavLink>)
                            }                          
                            </div>
                        </nav>
                     </header>

                    <div className="container">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="page-title_content">
                            
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6 margin-top">
                        <h1 className="mb-2">Contact us</h1>
                          <h4 className="contact-form_header">Let us know we can help you.</h4>
                          <form>
                            <div className="form-group">
                              <label>First Name</label>
                              <input type="text" className="form-control" id="exampleInputPassword1" placeholder="First name" />
                            </div>
                            <div className="form-group">
                              <label>Last Name</label>
                              <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Last name" />
                            </div>
                            <div className="form-group">
                              <label>Email address</label>
                              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                              <label>Subject</label>
                              <input type="text" className="form-control" id="inputSubject" aria-describedby="emailHelp"
                                placeholder="Enter subject" />
                            </div>
                            <div className="form-group">
                              <textarea className="form-control" id="commentTextArea" rows="3" placeholder="Message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>

                  <Footer />
                </div>
        )
    }
}