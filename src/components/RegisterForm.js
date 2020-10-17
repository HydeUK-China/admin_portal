import React, { Component, createRef } from 'react';
import _ from 'lodash';
import { fetchReq } from '../utils/utils';
import { countryList } from '../asset/countryList';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.allFields = ['firstname', 'lastname', 'nationality', 'email', 'password', 'phone'];

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
        const nationality = this.nationality;
        const email = this.email;
        const password = this.password;
        const phone = this.phone;

        fetchReq('/api/signup', {
            body: JSON.stringify({
                firstname: firstname.current.value,
                lastname: lastname.current.value,
                nationality: nationality.current.value,
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

    render() {
        const { confirmButtonText } = this.props;

        return (
            <form className="registerLogin-form" onSubmit={this.handleRegister}>
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
                        <label>Nationality </label>
                        <select name="nationality" className="form-control" required
                            ref={this.nationality}>
                            <option value=''>Please Select</option>
                            {_.map(countryList, (item, index) => {
                                return <option key={`country-${index}`} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="name@example.com"
                            ref={this.email} required />
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="******"
                            ref={this.password} required />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone number</label>
                        <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="796-644-8844"
                            ref={this.phone} required />
                    </div>
                </div>

                <button type="submit" style={{ maxWidth: 'inherit' }} className="apply-btn create_btn"> {confirmButtonText} </button>
            </form>
        )
    }
}