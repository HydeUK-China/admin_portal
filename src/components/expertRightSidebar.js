import React, { Component } from 'react';
import _ from 'lodash';
import UploadFile from '../components/uploadFile';

export default class ExpertRightSidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: { first_name: '', category: '' },
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
        const { data } = this.state;
        const { handleConfirm } = this.props;

        this.setState({
            showInput: false
        }, () => {
            handleConfirm(this.state.showInput, data)
        });
    }

    render() {
        const { showInput, data } = this.state;
        const { handleInputChange } = this.props;
        const { first_name, category } = data;
        const editContactField = ['phone_no', 'email'];
        const editSocialMediaField = ['linkedin', 'facebook', 'twitter']

        return (
            <div className="right-sidebar">
                <div className="right-sidebar-wrapper">
                    <div className="row">
                        <div className="upper_profile">
                            {
                                showInput ?
                                    <input type='file' className='center' />
                                    // <div className='center'>
                                    //     <UploadFile showDownload={false}/>
                                    // </div>
                                    : <div className='center'> </div>
                            }
                            {showInput ? <label className='red'>*Notice: Images size no more than 2MB</label> : null}
                        </div>
                        <div className='upper_profile'>
                            {showInput ?
                                <button className='btn' onClick={this.clickConfirm}>Save</button>
                                : <button className="btn" onClick={this.clickEdit}>Edit</button>
                            }</div>
                    </div>

                    <div className="bio">
                        {/* <span>
                            <h4>Hello,</h4>
                        </span> */}
                        <h1><b>{first_name}</b></h1>
                        <i>Bio: </i>
                        <p><i>{category}</i></p>
                    </div>

                    <div className="contact-details">
                        <ul className="contact-details-list">
                            <li className="contact-details-head">
                                <h4>Contact Details </h4>
                            </li>
                            {
                                showInput ?
                                    _.map(_.pick(data, editContactField), (value, key) => {
                                        return (
                                            <li key={`expertinfo-${key}`} className="contact-details-link">
                                                {key === 'phone_no' ? <i className="fas fa-phone"></i> : <i className="fas fa-envelope"></i>}
                                                <input defaultValue={value}
                                                    onChange={(e) => handleInputChange(e, key)} />
                                            </li>
                                        )
                                    }) :
                                    _.map(_.pick(data, editContactField), (value, key) => {
                                        return (
                                            <li key={`expertinfo-${key}`} className="contact-details-link">
                                                {key === 'phone_no' ? <i className="fas fa-phone"></i> : <i className="fas fa-envelope"></i>}
                                                <span>{value}</span>
                                            </li>
                                        )
                                    })
                            }
                        </ul>
                    </div>
                    
                    <div className="follow-me">
                        <ul className="follow-me-list">
                            {
                                Object.keys(_.pick(data, editSocialMediaField)).length !== 0 ?
                                    <li className="follow-me-head">
                                        <h4>Social Media Platforms </h4>
                                    </li>
                                    : null
                            }
                            {
                                showInput ?
                                    _.map(_.pick(data, editSocialMediaField), (value, key) => {
                                        return (
                                            <li key={`expertinfo-${key}`} className="follow-me-link">
                                                {key === 'linkedin' ? <i className="fa fa-linkedin"></i> :
                                                    (key === 'facebook' ? <i className="fab fa-facebook"></i> :
                                                        <i className="fab fa-twitter"></i>)}
                                                <input defaultValue={value}
                                                    onChange={(e) => handleInputChange(e, key)} />
                                            </li>
                                        )
                                    }) :
                                    _.map(_.pick(data, editSocialMediaField), (value, key) => {
                                        return (
                                            <li key={`expertinfo-${key}`} className="follow-me-link">
                                                {key === 'linkedin' ? <i className="fa fa-linkedin"></i> :
                                                    (key === 'facebook' ? <i className="fab fa-facebook"></i> :
                                                        <i className="fab fa-twitter"></i>)}
                                                <span>{value}</span>
                                            </li>
                                        )
                                    })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}