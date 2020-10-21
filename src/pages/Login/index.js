import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { setUserInfo } from '../../utils/utils';
import LoginForm from '../../components/loginForm';
import Footer from '../../components/Footer';

import '../../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.loginCallback = this.loginCallback.bind(this);
  }

  loginCallback(data) {
    setUserInfo(data);
    this.props.history.replace('/mgt');
  }

  render() {
    return (
      <div className="registerLogin-page">
        <div className="content-box container">
          <div className="row">
            <div className="col-md-6 form-col">
              <div className="logo-container">
                <Link className="logo" to="/home" style={{ 'color': 'black' }}>
                  HI TALENTS PORTAL
                </Link>
              </div>
              <div className="registerLogin-title_content">
                <h2 className="section-header">Log in</h2>
                <h4>Don't have an account?<Link to="/signup">Sign up</Link></h4>
              </div>
              <LoginForm
                loginCallback={this.loginCallback}
                confirmButtonText="Log in"
              />
              
            </div>
            <div className="col-md-6 bg-col">
              <div className="login-bg_image">
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(Login)