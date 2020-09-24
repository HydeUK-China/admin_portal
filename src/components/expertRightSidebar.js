import React, { Component } from 'react';

export default class ExpertRightSidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showInput: false
        }

        this.clickEdit = this.clickEdit.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: nextProps.data
            })
        }
    }

    clickEdit() {
        const { handleEdit } = this.props;

        this.setState({
            showInput: true
        }, () => {
            handleEdit(this.state.showInput)
        });
    }

    clickConfirm() {
        const { handleEdit } = this.props;

        this.setState({
            showInput: false
        }, () => {
            handleEdit(this.state.showInput)
        });
    }

    render() {
        const { showInput } = this.state;
        
        return (
            <div className="right-sidebar">
                <div className="right-sidebar-wrapper">
                    <div className="row">
                        <div className="profile">
                            {
                                showInput ?
                                    <input type='file' className='center' />
                                    : <div className='center'> </div>
                            }
                        </div>
                        {
                            showInput ?
                                <button className='btn' onClick={this.clickConfirm}>Save</button>
                                : <button className="btn" onClick={this.clickEdit}>Edit</button>
                        }

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
        )
    }
}