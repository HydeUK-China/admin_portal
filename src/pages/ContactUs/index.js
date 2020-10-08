import React, { Component } from 'react';

import '../../styles/main.css';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        return (
  <div>
  <header id="header">
                        <div className="brand-container">
                            <a className="brand" href="/">
                            Hyde International Talents
                        
                            </a>
                        </div>

                        <nav className="main-nav">
                            <a className="nav-item" href="/">Home</a>
                            <a className="nav-item" href="/jobPages/category-page.html">Jobs</a>
                            <a className="nav-item" href="/about-page.html">About</a>
                            <a className="nav-item" href="/contact-page.html">Contact</a>
                            <div className="sign-in">
                            <a className="nav-item user" href="accounts/login.html">
                                <div className="fa fa-user-o"></div>
                            </a>
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