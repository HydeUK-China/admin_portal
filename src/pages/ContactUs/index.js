import React, { Component, createRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole, fetchReq } from '../../utils/utils';
import Footer from '../../components/Footer';
import '../../styles/contactus.css';
import _ from 'lodash';
 

export default class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
          fname: '',
          lname: '',
          email: '',
          subject: '',
          message: '',
          role: getRole()
        };

        this.allFields = ['fname', 'lname', 'email', 'subject', 'message'];

        this.createRefByField(this.allFields);

        this.submitEmail = this.submitEmail.bind(this);
      
    }

    createRefByField(field) {
      _.forEach(field, (item, index) => {
          this[item] = createRef()
      });
  }
    

    submitEmail(e){
      e.preventDefault();

      // const dis = document.getElementsByClassName('loader-pos');
      // dis.style.display = 'block';
      const fname = this.fname;
      const lname = this.lname;
      const email = this.email;
      const subject = this.subject;
      const message = this.message;

          fetchReq('/api/mailer', {
            body: JSON.stringify({
                fname: fname.current.value,
                lname: lname.current.value,
                email: email.current.value,
                subject: subject.current.value,
                message: message.current.value
            })
        }).then(data => {
            // console.log(data)
            if(alert('Message Sent!')){} 
            else window.location.reload(); 
        }).catch(msg =>
            alert(msg)
        )
  }
    
    resetForm(){
          this.setState({name: '', email: '',subject:'', message: ''})
    }
  





    render() {
      const { role } = this.state;
      const { fname, lname, email, subject, message, sentMessage } = this.state;
        return (
                <div>
                  <section id="top" className="contact-header">
                      <div className="side-image">
                      </div>
                      <header id="header">
                        <div className="brand-container">
                            <Link className="brand" to="/home">
                                Hyde International Talents       
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
                            <h1>Contact <span style={{display:'block'}}>us</span></h1>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6 margin-top">
                          <h4 className="contact-form_header">Let us know we can help you.</h4>
                          <form id="contact-form" onSubmit={this.submitEmail} method="POST">
                            <div className="form-group">
                              <label>First Name</label>
                              <input type="text" className="form-control" name="fname" id="fname" placeholder="First name" ref={this.fname} required/>
                            </div>
                            <div className="form-group">
                              <label>Last Name</label>
                              <input type="text" className="form-control" name="lname" id="lname" placeholder="Last name" ref={this.lname} required/>
                            </div>
                            <div className="form-group">
                              <label>Email address</label>
                              <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"
                                placeholder="Enter email" ref={this.email} required/>
                            </div>
                            <div className="form-group">
                              <label>Subject</label>
                              <input type="text" className="form-control" name="subject" id="subject"  aria-describedby="emailHelp"
                                placeholder="Enter subject" ref={this.subject} required/>
                            </div>
                            <div className="form-group">
                              <textarea className="form-control" name="message" id="messsage"  rows="3" placeholder="Message" ref={this.message} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send</button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="loader-pos" style={{display: 'none'}}>
                      <div className="loader"/>
                    </div>
                  </section>

                  <Footer />
                </div>
        )
    }
}