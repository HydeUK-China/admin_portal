import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ForgotPas extends Component {




    render() {
        return (
            <div className="container w-40 text-center">
                <form action="#" method="post">
                    <h2 className="text-center">Forgot Password</h2>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" required="required" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn" style={{backgroundColor: '#00216 !important'}}>Submit</button>
                        </div>  
                    </form>
                    </div>


















        )
    }
}

