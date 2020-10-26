import React, { Component, createRef } from 'react';
import _ from 'lodash';
import { fetchReq } from '../utils/utils';
import { placeholder } from '../asset/placeholder';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {}
        }

        this.allFields = ['firstname', 'lastname', 'email', 'password', 'confirmPassword', 'phone'];

        this.createRefByField(this.allFields);

        this.handleRegister = this.handleRegister.bind(this);

    }

    createRefByField(field) {
        _.forEach(field, (item, index) => {
            this[item] = createRef()
        });
    }

    handleRegister(e) {
        const { registerCallback } = this.props;

        e.preventDefault();

        const firstname = this.firstname;
        const lastname = this.lastname;
        const email = this.email;
        const password = this.password;
        const confirmPassword = this.confirmPassword
        const phone = this.phone;

        // console.log("1->", password.current.value)
        // console.log("2->", confirmPassword.current.value)

        if(this.validate(password, confirmPassword)){

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
                registerCallback(data);
            }).catch(msg => {
                alert(msg);
            });
        }

    }

    validate(p, cP){
        
        let errors = {};
        let isValid = true;
        
        if (!p.current.value) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }
      
          if (!cP.current.value) {
            isValid = false;
            errors["confirmPassword"] = "Please enter your confirm password.";
          }
      
          if (typeof p.current.value !== "undefined" && typeof cP.current.value !== "undefined") {
              
            if (p.current.value != cP.current.value) {
              isValid = false;
              errors["password"] = "Passwords don't match.";
            }
          } 
      
          this.setState({
            errors: errors
          });
  
          return isValid;
    }

 showPass = () => {
        const x = document.getElementById("inputPassword4");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    render() {
        const { confirmButtonText } = this.props;

        return (
            <form className="registerLogin-form" onSubmit={this.handleRegister}>
                <div className="form-row">
                    <div className="col">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder={placeholder.first_name} ref={this.firstname} required />
                    </div>
                    <div className="col">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder={placeholder.last_name} ref={this.lastname} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder={placeholder.email}
                            ref={this.email} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="******" ref={this.password} required />
                        <div className="text-danger">{this.state.errors.password}</div>
                        <input style={{marginTop: '5%'}} type="checkbox" onClick={this.showPass}/>&nbsp;Show Password
                    </div>
                    <div className="form-group col-md-6">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="******" ref={this.confirmPassword} required />
                        <div className="text-danger">{this.state.errors.confirmPassword}</div>
                    </div>
                </div>
                <div className="form-group">

                    <div className="form-group">
                        <label>Phone number</label>
                        <input type="tel" className="form-control" id="inputPhoneNumber" placeholder={placeholder.phone_no}
                            ref={this.phone} required />
                    </div>
                </div>

                <button type="submit" style={{ maxWidth: 'inherit' }} className="apply-btn create_btn"> {confirmButtonText} </button>
            </form>
        )
    }
}