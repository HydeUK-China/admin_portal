import React, { Component } from 'react';
import _ from 'lodash';
import ExpertRightSidebar from '../../components/expertRightSidebar';
import { fetchReq } from '../../utils/utils';
import { placeholder } from '../../asset/placeholder';

export default class ExpertProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            showInput: false,
            editbutton: 'Edit',
            savebutton: 'Save'
        }

        this.lessField = ['expert_id', 'title', 'first_name', 'category', 'email', 'phone_no', 'linkedin', 'facebook', 'twitter']
        this.moreHeader = ['Education', 'Employment', 'Patents', 'Publications',
            'Field of Speciality', 'Awards', 'Scientific Contribution And Research Leadership',
            'Collaborative Project Proposal']
        this.moreField = ['education', 'employment', 'patents', 'publications',
            'field_of_speciality', 'awards', 'scientific_contribution_and_research_leadership',
            'collaborative_project_proposal']

        this.expertId = props.uid;
        this.fieldTitle = _.zipObject(this.moreField, this.moreHeader);
    }

    componentDidMount() {
        const url = `/api/fetchExpert/${this.expertId}`
        fetchReq(url).then(data => {
            this.setState({
                data
            })
        }).catch(err => alert(err));
    }

    handleTextChange(e, key) {
        const { data } = this.state;

        const tmp_data = Object.assign(data, {
            [key]: e.target.value
        });
        this.setState({
            data: tmp_data
        });
    }

    editHandler = (isEdit) => {
        this.setState({
            showInput: isEdit
        })
    };

    confirmHandler = (isEdit, sidebarData) => {
        const { data } = this.state;

        const tmp_data = Object.assign(data, {
            ...sidebarData
        });
        
        fetchReq('/api/editExpert', {
            body: JSON.stringify({
                record: tmp_data
            })
        }).then(feedback => {
            this.setState({
                data: tmp_data,
                showInput: isEdit
            });
        }).catch(err => alert(err));
    }

    render() {
        const { showInput, data } = this.state;

        return (
            <div>
                <div className="profile">
                    {
                        showInput ?
                            _.map(_.pick(data, this.moreField), (value, key) => {
                                return (
                                    <div key={`expertinfo-${key}`}>
                                        <h3 className='label-tag'>{this.fieldTitle[key]}</h3>
                                        <textarea className='profile-content'
                                            row='2'
                                            defaultValue={value}
                                            placeholder={placeholder[key]}
                                            onChange={(e) => this.handleTextChange(e, key)}></textarea>
                                    </div>
                                )
                            })
                            :
                            _.map(_.pick(data, this.moreField), (value, key) => {
                                return (
                                    <div key={`expertinfo-${key}`}>
                                        <h3 className='label-tag'>{this.fieldTitle[key]}</h3>
                                        <section className='profile-content'>
                                            {value}
                                        </section>
                                    </div>
                                )
                            })
                    }
                </div>

                <ExpertRightSidebar
                    data={_.pick(data, this.lessField)}
                    handleInputChange={(e, key) => this.handleTextChange(e, key)}
                    handleEdit={this.editHandler}
                    handleConfirm={this.confirmHandler}
                />

            </div>

        )
    }
}


