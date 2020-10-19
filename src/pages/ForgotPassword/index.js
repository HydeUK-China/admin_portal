import React, { Component } from 'react';
import { fetchReq } from '../../utils/utils';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
        }
        this.email = React.createRef();

        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword(e){
        e.preventDefault();

        const email = this.email;

        fetchReq('/api/forgotPassword', {
            body: JSON.stringify({
                email: email.current.value
            })
        }).then(data => {
            alert(data);
        }).catch(msg => {
            alert(msg);
        });
    }

    render() {
        return (
            <div className="container w-40 text-center">
                <form onSubmit={this.forgotPassword}>
                    <h2 className="text-center">Forgot Password</h2>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" ref={this.email} required />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn" style={{ backgroundColor: '#00216 !important' }}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}