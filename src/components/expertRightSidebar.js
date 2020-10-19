import React, { Component } from 'react';
import _ from 'lodash';
import UploadFile from '../components/uploadFile';
import { countryList } from '../asset/countryList';

export default class ExpertRightSidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: { first_name: '', expertise: '' },
            showInput: props.showInput
        }

        this.clickEdit = this.clickEdit.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: nextProps.data,
                showInput: nextProps.showInput
            })
        }
    }

    clickEdit(e) {
        e.preventDefault();
        const { handleEdit } = this.props;

        handleEdit({ showInput: true })
    }

    clickConfirm() {
        const { data } = this.state;
        const { handleConfirm } = this.props;

        handleConfirm(data)
    }

    render() {
        const { showInput, data } = this.state;
        const { handleInputChange } = this.props;
        const { nationality, first_name, expertise } = data;
        const editContactField = ['phone_no', 'email'];
        const editSocialMediaField = ['linkedin', 'skype', 'twitter']

        return (
            <div className="right-sidebar">
                <div className="right-sidebar-wrapper">
                    <div className='upper_profile'>
                        <div className="upper_profile_left">
                            {
                                showInput ?
                                    <input type='file' className='center' />
                                    // <div className='center'>
                                    //     <UploadFile showDownload={false}/>
                                    // </div>
                                    : <div className='center'> </div>
                            }
                            {showInput ? <label className='red'>* Notice: Images size no more than 2MB</label> : null}

                            {showInput ?
                                <button className='btn' onClick={this.clickConfirm}>Save</button>
                                : <button className="btn" onClick={this.clickEdit}>Edit</button>
                            }</div>


                        <div className="bio">
                            <span>
                                <h4>Hello,</h4>
                            </span>
                            <h6><b>{first_name}</b></h6>


                            <i>Bio: </i>
                            <p><i>{expertise}</i></p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <i>Nationality: </i>
                        {showInput ? <select name="nationality" className="form-control_profileEdit" required
                            onChange={(e) => handleInputChange(e, 'nationality')}>
                            <option value=''>Please Select</option>
                            {_.map(countryList, (item, index) => {
                                return <option key={`country-${index}`} value={item}>{item}</option>
                            })}
                        </select> : <p><i>{nationality}</i></p>}
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
                                                    (key === 'skype' ? <i className="fab fa-skype"></i> :
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
                                                    (key === 'skype' ? <i className="fab fa-skype"></i> :
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