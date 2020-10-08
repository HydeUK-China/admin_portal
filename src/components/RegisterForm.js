import React, { Component, createRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {fetchReq, setUserInfo} from '../utils/utils';





export default class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.allFields = ['firstname', 'lastname', 'email', 'password', 'phone'];

        this.createRefByField(this.allFields);

        this.handleRegister = this.handleRegister.bind(this);

    }

    createRefByField(field) {
        _.forEach(field, (item, index) => {
            this[item] = createRef()
        });
    }

    handleRegister(e) {
        e.preventDefault();

        const firstname = this.firstname;
        const lastname = this.lastname;
        const email = this.email;
        const password = this.password;
        const phone = this.phone;

        fetchReq('/api/signup', {
            body: JSON.stringify({
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                email: email.current.value,
                password: password.current.value,
                phone: phone.current.value,
                role: 'expert'
            })
        }).then(data => {
            setUserInfo(data)
        })
    }




    render() {

        const state = this.state;

        return (
            <Fragment>
                <section className="registerLogin-page">
                    <div className="content-box container">
                        <div className="row">
                            <div className="col-md-6 form-col">


                                <Link className="logo" to="/" style={{ 'color': 'black' }}>
                                    HI TALENTS PORTAL
              </Link>

                                <div className="registerLogin-title_content">
                                    <h2>Sign up</h2>
                                    <h4>Register now and get access to amazing opportunities</h4>
                                </div>
                                <form className="registerLogin-form">
                                    <div className="form-row">
                                        <div className="col">
                                            <label>First name</label>
                                            <input type="text" className="form-control" placeholder="Jane" ref={this.firstname} required />
                                        </div>
                                        <div className="col">
                                            <label>Last name</label>
                                            <input type="text" className="form-control" placeholder="Doe" ref={this.lastname} required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Email</label>
                                            <input type="email" className="form-control" id="inputEmail4" placeholder="name@example.com"
                                                ref={this.email} required />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Password</label>
                                            <input type="password" className="form-control" id="inputPassword4" placeholder="******"
                                                ref={this.password} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone number</label>
                                        <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="796-644-8844"
                                            ref={this.phone} required />
                                    </div>

                                    <button type="submit" className="apply-btn create_btn" onClick={this.handleRegister}> Create Account</button>
                                </form>
                            </div>
                            <div className="col-md-6 bg-col">
                                <div className="register-bg_image">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
