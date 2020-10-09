import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole } from '../../utils/utils';
import '../../styles/main.css';

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
  <header id="header">
                        <div className="brand-container">
                            <a className="brand" href="/">
                            Hyde International Talents
                        
                            </a>
                        </div>

                        <nav className="main-nav">
                            <NavLink className="nav-item" to="/home">Home</NavLink>
                            <NavLink className="nav-item" to="/jobs">Jobs</NavLink>
                            <NavLink className="nav-item" to="/aboutus">About</NavLink>
                            <NavLink className="nav-item" to="/contactus">Contact</NavLink>
                            <div className="sign-in">
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
                            </div>
                        </nav>
        
                     </header>
      <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="page-title_content">
            <h1>Contact <span style={{display:'block;'}}>us</span></h1>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 margin-top">
          <h4 class="contact-form_header">Let us know we can help you.</h4>
          <form>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="First name" />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Last name" />
            </div>
            <div class="form-group">
              <label for="Email">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <input type="text" class="form-control" id="inputSubject" aria-describedby="emailHelp"
                placeholder="Enter subject" />
            </div>
            <div class="form-group">
              <textarea class="form-control" id="commentTextArea" rows="3" placeholder="Message"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
</div>
        )
    }
}