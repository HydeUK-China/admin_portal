import React, { Component } from 'react';
import _ from 'lodash';
import ExpertRightSidebar from '../../components/expertRightSidebar';
import { fetchReq } from '../../utils/utils';

export default class ExpertProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            showInput: false,
            editbutton: 'Edit',
            savebutton: 'Save'

        }

        this.lessHeader = ['Title', 'First Name', 'Category', 'Email', 'Phone No']

        this.lessField = ['title', 'first_name', 'category', 'email', 'phone_no']

        this.moreHeader = ['Education', 'Employment', 'Projects', 'Patents',
            'Field of Speciality', 'Awards', 'Products', 'Publication Date', 'Recent Major Research Projects',
            'Collaborative Project Proposal']

        this.moreField = ['education', 'employment', 'projects', 'patents',
            'field_of_speciality', 'awards', 'products', 'publication_date', 'recent_major_research_projects',
            'collaborative_project_proposal']
    }

    componentDidMount() {
        const expertId = 1;
        const url = `/api/fetchExpert/${expertId}`
        fetchReq(url).then(data => {
            this.setState({
                data
            })
        }).catch(err => console.log(err));
    }

    handleTextChange(e, key) {
        const { data } = this.state;

        const tmp_data = Object.assign(data, {
            [key]: e.target.value
        })
        this.setState({
            data: tmp_data
        });
    }

    editHandler = (isEdit) => {
        this.setState({
            showInput: isEdit
        })
    };

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
                                        <h3 className='label-tag'>{key}</h3>
                                        <textarea className='profile-content'
                                            row='2'
                                            defaultValue={value}
                                            onChange={(e) => this.handleTextChange(e, key)}></textarea>
                                    </div>
                                )
                            })
                            :
                            _.map(_.pick(data, this.moreField), (value, key) => {
                                return (
                                    <div key={`expertinfo-${key}`}>
                                        <h3 className='label-tag'>{key}</h3>
                                        <section className='profile-content'>
                                            {value}
                                        </section>
                                    </div>
                                )
                            })
                    }
                </div>
                
                <ExpertRightSidebar 
                    data={data}
                    field={this.lessField}
                    handleEdit={this.editHandler}
                />
                
            </div>

        )
    }
}


