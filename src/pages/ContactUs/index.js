import React, { Component, createRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole, fetchReq } from '../../utils/utils';
import Footer from '../../components/Footer';
import '../../styles/contactus.css';
import _ from 'lodash';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import contactUs from '../../img/contact_2_cropped.png'
import { Row } from 'react-bootstrap'
import { Grid } from '@material-ui/core'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import PersonIcon from '@material-ui/icons/Person';

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
    ReactGA.pageview(window.location.pathname + window.location.search);
    return (
      <div>
        <Helmet>
          <title>HYDE INTERNATIONAL UK | CONTACT US</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="title" content="HYDE INTERNATIONAL UK CONTACT US" />
          <meta name="description" content="HYDE INTERNATIONAL SERVICES" />
          <meta name="keywords" content="talents" />
          <meta name="keywords" content="china and uk talents contact us" />
          <meta name="keywords" content="research grants contact us" />

        </Helmet>

        {/* Nav Bar */}
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-transperent sticky-top px-3 text-dark">
            <NavLink className="navbar-brand text-dark" to="/home" title='Hi Talents'><h2>HI Talents</h2></NavLink>
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
                <li className="sign-in">
                  {role === '__admin__' ?
                    <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                      <PersonIcon />
                    </NavLink>
                    :
                    (role === 'expert' ?
                      <NavLink className="nav-item user" to="/mgt/expert_profile">
                        <PersonIcon />
                      </NavLink>
                      : <NavLink className="nav-item user" to="/login">
                        <span className='nav-link'>Login</span>
                      </NavLink>)
                  }
                </li>
              </ul>

            </div>
          </nav>
        </div>

        {/* Contact Us */}
        <div className="contactUs_Container">
          <Grid container spacing={3} alignItems='center' justify='center'
            style={{ width: '100%', margin: '0px' }} >
            <Row>
              <Grid item xs={12} sm={12} md={8} lg={8}  >
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
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <LazyLoadImage src={contactUs} width='100%' height='100%' />
              </Grid>
            </Row>
          </Grid>
        </div>



        <Footer />

      </div >

    )
  }
}