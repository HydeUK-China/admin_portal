import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../components/forgotPasswordForm';
import Footer from '../../components/Footer';
import '../../styles/login.css'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

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
                            <div className="registerLogin-title_content ">
                            <h2 className="section-header">Forgot Password</h2>
                                <h4><Link to="/signup">Sign up</Link> / <Link to="/login">Login</Link> </h4>
                            </div>
                            <ForgotPasswordForm />
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