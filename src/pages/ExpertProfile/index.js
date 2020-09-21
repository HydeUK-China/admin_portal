import React, { Component, Fragment } from 'react'
import '../../styles/app.css'
import user_img from '../../img/user.png'


export default class ExpertProfile extends Component {
    render() {
        return (
            <Fragment>
                <div className="profile">

                    <h3 className='label-tag'>Education</h3>
                    <section className='profile-content'>
                        Display Education Info
                    </section>
                    <h3 className='label-tag'>Employment</h3>
                    <section className='profile-content'>
                        Display Employment Info
                    </section>
                    <h3 className='label-tag'>Patents</h3>
                    <section className='profile-content'>
                        Display Patents Info
                    </section>
                    <h3 className='label-tag'>Publication</h3>
                    <section className='profile-content'>
                        Display Publication Info
                    </section>
                    <h3 className='label-tag'>Awards</h3>
                    <section className='profile-content'>
                        Display Awards Info
                    </section >
                    <h3 className='label-tag'>Collaboration Project Proposal</h3>
                    <section className='profile-content'>
                        Display Collaboration Project Proposal Info
                    </section>

                </div>

                <div className="right-sidebar">
                    <div className="right-sidebar-wrapper">
                        <div className="row">
                            <div className="profile">
                                <img src={user_img} alt="User Image" className="center" />
                            </div>
                            <button className="btn">Edit Profile</button>

                        </div>
                        <div className="bio">
                            <span>
                                <h4>Hello,</h4>
                            </span>
                            <h1><b>Jonathan</b></h1>
                        </div>

                        <div className="contact-details">
                            <ul className="contact-details-list">
                                <li className="contact-details-head">
                                    <h4>Contact Details </h4>

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
                                    <h4>Social Media Platforms </h4>
                                </li>
                                <li className="follow-me-link">
                                    <i className="fa fa-linkedin" aria-hidden="true"></i><span>Hyde International Talents</span>
                                </li>
                                <li className="follow-me-link">
                                    <i className="fab fa-facebook-square"></i><span>Hyde International Talents</span>
                                </li>
                                <li className="follow-me-link">
                                    <i className="fab fa-twitter"></i><span>Hyde International Talents</span>
                                </li>


                            </ul>

                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}


