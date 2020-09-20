import React, { Component } from 'react'
import '../../styles/app.css'
import user_img from '../../img/user.png'


export default class ExpertProfile extends Component {
    render() {
        return (
            <div>
                <div className="right-sidebar">
                    <div className="right-sidebar-wrapper">
                        <div className="row">
                            <div className="profile">
                                <img src={user_img}alt="User Image" className="center" />
                            </div>
                            <button className="btn">Edit Profile</button>

                        </div>
                        <div className="bio">
                            <span>
                                <h4>Hello,</h4>
                            </span>
                            <h1><b>Jonathan</b></h1>
                            <i>Bio: </i>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                        </div>

                        <div className="contact-details">
                            <ul className="contact-details-list">
                                <li className="contact-details-head">
                                    <h4>Contact Details </h4>

                                </li>
                                <li className="contact-details-link">
                                    <i className="fa fa-map-marker"></i><span>St etheldredas Drive, Hatfield</span>
                                </li>

                                <li className="contact-details-link">
                                    <i className="fas fa-phone"></i><span>+44 7123456789</span>
                                </li>
                                <li className="contact-details-link">
                                    <i className="fas fa-envelope"></i><span>www.xyz@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                        <div className="follow-me">
                            <ul className="follow-me-list">
                                <li className="follow-me-head">
                                    <h4>Follow Me </h4>
                                </li>
                                <li className="follow-me-link">
                                    <i className="fa fa-linkedin" aria-hidden="true"></i><span>10 St etheldredas Drive, Hatfield</span>
                                </li>
                                <li className="follow-me-link">
                                    <i className="fa fa-skype"></i><span>www.xyz@gmail.com</span>
                                </li>
                                <li className="follow-me-link">
                                    <i className="fab fa-whatsapp"></i><span>+44 7123456789</span>
                                </li>


                            </ul>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


