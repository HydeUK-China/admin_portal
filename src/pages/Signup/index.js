import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { setUserInfo } from '../../utils/utils';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';
import Footer from '../../components/Footer';
import registerbg from '../../img/registerbg.jpg';
class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.registerCallback = this.registerCallback.bind(this);
    }

    registerCallback(data) {
        setUserInfo(data);
        this.props.history.replace('/mgt');
    }

    render() {
        return (
            <div className="registerLogin-page">
                <div className="content-box container">
                    <div className="row">
                        <div className="col-md-8 col-lg-6">
                            <div className="logo-container">
                                <Link className="logo" to="/home" style={{ 'color': 'black' }}>
                                    HI TALENTS PORTAL
                                </Link>
                            </div>
                            <div className="registerLogin-title_content">
                                <h2>Sign up</h2>
                                <h4>Register now and get access to amazing opportunities</h4>
                            </div>
                            
                            <RegisterForm
                                registerCallback={this.registerCallback}
                                confirmButtonText="Create Account"
                            />

                        </div>
                        <div className="col-md-4 col-lg-6">
                        <img className="register-bg_image" src={registerbg}></img>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Signup)