import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from '../../components/resetPasswordForm';
import Footer from '../../components/Footer';

export default class ResetPassword extends Component {
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
                            <div className="registerLogin-title_content">
                                <h2>Update Password</h2>
                            </div>
                            <ResetPasswordForm />
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