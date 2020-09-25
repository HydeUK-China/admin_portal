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

    handleInputChange(e, key) {
        const { data } = this.state;

        const tmp_data = Object.assign(data, {
            [key]: e.target.value
        })
        this.setState({
            data: tmp_data
        });
    }

    render() {
        const { showInput, data } = this.state;
        const { first_name, category } = data;
        const editField = ['phone_no', 'email']

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
                        {                           showInput ?
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
                        <p>{category}</p>
                    </div>

                    <div className="contact-details">
                        <ul className="contact-details-list">
                            <li className="contact-details-head">
                                <h4>Contact Details </h4>
                            </li>

                            {
                                showInput ?
                                    _.map(_.pick(data, editField), (value, key) => {
                                        return (
                                            <li key={`expertinfo-${key}`} className="contact-details-link">
                                                {key === 'phone_no' ? <i className="fas fa-phone"></i> : <i className="fas fa-envelope"></i>}
                                                <input defaultValue={value}
                                                    onChange={(e) => this.handleInputChange(e, key)} />
                                            </li>
                                        )
                                    }) :
                                    _.map(_.pick(data, editField), (value, key) => {
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
                            <li className="follow-me-head">
                                <h4>Social Media Platforms </h4>
                            </li>
                            <li className="follow-me-link">
                                <i className="fa fa-linkedin" aria-hidden="true"></i><span>Hyde International Talents</span>
                            </li>
                            <li className="follow-me-link">
                                <i className="fab fa-skype"></i><span>Hyde International Talents</span>
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