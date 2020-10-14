import React, { Component } from 'react';
import { fetchReq } from '../utils/utils';

import '../styles/login.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.email = React.createRef()
        this.password = React.createRef()

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        const { loginCallback } = this.props;

        e.preventDefault();

        const email = this.email;
        const pwd = this.password;

        fetchReq('/api/login', {
            body: JSON.stringify({
                email: email.current.value,
                password: pwd.current.value
            })
        }).then(data => {
            loginCallback(data);
        }).catch(msg => {
            alert(msg);
        });
    }

    render() {
        const { confirmButtonText } = this.props;

        return (
            <form className="registerLogin-form">
                <div className="form-group ">
                    <label>Username</label>
                    <input type="email" className="form-control" ref={this.email} placeholder="username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" ref={this.password} placeholder="*******" />
                </div>
                <div style={{maxWidth: 'inherit'}} className="apply-btn create_btn" onClick={this.handleLogin}> {confirmButtonText} </div>
            </form>
        )
    }
}