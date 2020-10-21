import React, { Component, createRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole, fetchReq } from '../../utils/utils';
import Footer from '../../components/Footer';
import '../../styles/contactus.css';
import _ from 'lodash';
import TopNav from '../../components/TopNav';
import womenimg from '../../img/photography-of-woman.jpg'

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


  submitEmail(e) {
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
      if (alert('Message Sent!')) { }
      else window.location.reload();
    }).catch(msg =>
      alert(msg)
    )
  }

  resetForm() {
    this.setState({ name: '', email: '', subject: '', message: '' })
  }






  render() {
    const { role } = this.state;
    const { fname, lname, email, subject, message, sentMessage } = this.state;
    return (
      <div>
        <TopNav></TopNav>
                    <div className="container mb-0">
                      <div className="row no-gutters">
                        
                        <div className="col-md-6 mt-2 pb-0 align-items-center">
                        <header className="section-header">
                        <h1 className="mb-2">Contact us</h1>

                          <h4 className="contact-form_header">Let us know we can help you.</h4>
                        </header>
                          <form id="contact-form" onSubmit={this.submitEmail} method="POST">
                            <div className="form-group">
                              {/* <label>First Name</label> */}
                              <input type="text" className="form-control" name="fname" id="fname" placeholder="First name" ref={this.fname} required/>
                            </div>
                            <div className="form-group">
                             {/*  <label>Last Name</label> */}
                              <input type="text" className="form-control" name="lname" id="lname" placeholder="Last name" ref={this.lname} required/>
                            </div>
                            <div className="form-group">
                              {/* <label>Email address</label> */}
                              <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"
                                placeholder="Enter email" ref={this.email} required/>
                            </div>
                            <div className="form-group">
                              {/* <label>Subject</label> */}
                              <input type="text" className="form-control" name="subject" id="subject"  aria-describedby="emailHelp"
                                placeholder="Enter subject" ref={this.subject} required/>
                            </div>
                            <div className="form-group">
                              <textarea className="form-control" name="message" id="messsage"  rows="3" placeholder="Message" ref={this.message} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send</button>
                          </form>
                        </div>

                        <div className="col-md-6 pb-0">
                          
                          <img src={womenimg} width="100%" height="auto" ></img>
                            
                        
                        </div>
                      </div>
                    </div>
                    <div className="loader-pos" style={{display: 'none'}}>
                      <div className="loader"/>
                    </div>

        


          <Footer />
        </div>
        
        )
    }
}