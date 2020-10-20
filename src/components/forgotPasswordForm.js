import React, { Component } from 'react';
import { fetchReq } from '../utils/utils';

export default class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSpinner: false
        }
        this.email = React.createRef();

        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword(e) {
        e.preventDefault();

        this.setState({
            showSpinner: true
        })
        
        const email = this.email;
        
        fetchReq('/api/forgotPassword', {
            body: JSON.stringify({
                email: email.current.value
            })
        }).then(data => {
            this.setState({
                showSpinner: false
            })
            alert(data);
        }).catch(msg => {
            this.setState({
                showSpinner: false
            })
            alert(msg);
        });
    }

    render() {
        const { showSpinner } = this.state;

        return (
            <form className="registerLogin-form" onSubmit={this.forgotPassword}>
                <div className="form-group centered">
                    <input type="email" className="form-control" placeholder="Please enter your registered email" ref={this.email} required />
                </div>
                <div className="form-group">
                    <button type="submit" className="apply-btn">Submit</button>
                </div>
                <div className={showSpinner ? "spinner" : null}></div>
            </form>
        )
    }
}