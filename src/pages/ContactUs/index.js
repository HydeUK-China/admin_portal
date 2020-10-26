import React, { Component, createRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole, fetchReq } from '../../utils/utils';
import Footer from '../../components/Footer';
import '../../styles/contactus.css';
import _ from 'lodash';
import TopNav from '../../components/TopNav';
import womenimg from '../../img/contact_2_cropped.png'

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
        <section className="">
          <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-transperent sticky-top px-3 text-dark">
              <NavLink className="navbar-brand text-dark" to="/home"><h2>HI Talents</h2></NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/home">Home {/* <span className="sr-only">(current)</span> */}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
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
          </header>
          <section>
            <div className="container px-5 mt-5">
              
                <div className="row">

                  <div className="col-md-8 col-lg-6 mt-2 align-center">
                    <header className="section-header">
                      <h1 className="mb-2">Contact us</h1>

                      <h4 className="contact-form_header">Let us know we can help you.</h4>
                    </header>
                    <form id="contact-form" onSubmit={this.submitEmail} method="POST">
                      <div className="form-group">
                        {/* <label>First Name</label> */}
                        <input type="text" className="form-control" name="fname" id="fname" placeholder="First name" ref={this.fname} required />
                      </div>
                      <div className="form-group">
                        {/*  <label>Last Name</label> */}
                        <input type="text" className="form-control" name="lname" id="lname" placeholder="Last name" ref={this.lname} required />
                      </div>
                      <div className="form-group">
                        {/* <label>Email address</label> */}
                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"
                          placeholder="Enter email" ref={this.email} required />
                      </div>
                      <div className="form-group">
                        {/* <label>Subject</label> */}
                        <input type="text" className="form-control" name="subject" id="subject" aria-describedby="emailHelp"
                          placeholder="Enter subject" ref={this.subject} required />
                      </div>
                      <div className="form-group">
                        <textarea className="form-control" name="message" id="messsage" rows="3" placeholder="Message" ref={this.message} required></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                  </div>

                  <div className="col-md-6 pb-0">
                    <img className = "contact-image" src={womenimg} ></img>
                  </div>
                </div>
             
            </div>
          </section>
          {/* <div className="loader-pos" style={{display: 'none'}}>
                      <div className="loader"/>
                    </div> */}


        </section>
        
        <Footer />

      </div>

    )
  }
}