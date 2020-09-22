import React, { Component, Fragment } from 'react'
import '../../styles/app.css'
import user_img from '../../img/user.png'


export default class ExpertProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 'Display Expert Profile Info',
            isInEdit: false,
            editbutton: 'Edit',
            savebutton: 'Save'

        }
    }

    edit = () => {
        this.setState({
            isInEdit: !this.state.isInEdit
        })
    };

    render() {
        return (
            <Fragment>
                <div className="profile">

                    <h3 className='label-tag'>Education</h3>
                    {this.state.isInEdit ? <textarea row='5' className='profile-content'>{this.state.value}</textarea> : <section className='profile-content'>
                        {this.state.value}
                    </section>}

                    <h3 className='label-tag'>Employment</h3>
                    {this.state.isInEdit ? <textarea row='5' className='profile-content'>{this.state.value}</textarea> : <section className='profile-content'>
                        {this.state.value}
                    </section>}
                    <h3 className='label-tag'>Patents</h3>
                    {this.state.isInEdit ? <textarea row='5' className='profile-content'>{this.state.value}</textarea> : <section className='profile-content'>
                        {this.state.value}
                    </section>}
                    <h3 className='label-tag'>Publication</h3>
                    {this.state.isInEdit ? <textarea row='5' className='profile-content'>{this.state.value}</textarea> : <section className='profile-content'>
                        {this.state.value}
                    </section>}
                    <h3 className='label-tag'>Awards</h3>
                    {this.state.isInEdit ? <textarea row='5' className='profile-content'>{this.state.value}</textarea> : <section className='profile-content'>
                        {this.state.value}
                    </section>}
                    <h3 className='label-tag'>Collaboration Project Proposal</h3>
                    {this.state.isInEdit ? <textarea row='5' className='profile-content'>{this.state.value}</textarea> : <section className='profile-content'>
                        {this.state.value}
                    </section>}

                </div>

                <div className="right-sidebar">
                    <div className="right-sidebar-wrapper">
                        <div className="row">
                            <div className="profile">
                              <input type='file' className='center'/>
                            </div>
                           {this.state.isInEdit ? <button className='btn' onClick={this.edit}>Save</button> : <button className="btn" onClick={this.edit}>Edit</button> } 

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


