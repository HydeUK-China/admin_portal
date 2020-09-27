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

        this.morePlaceholder = ["(E.g.) Current - Past  1. Bachelor 1988/09 – 1992/07 china Peking University Mechanical Engineering",
            "(E.g. ) Current - Past  1. Principal Reseracher 20/14/09-20/17/12 USA General Electric Company",
            "1. 20/18/01-20/19/03 | Development of manganese-based lithiumion batteries and supercapacitors (funded by DST/NRF) |$1000,0000 | 25 | R & D Manager and Principal Investigator ",
            "(E.g. ) Current - Past  1. Date Filling (2018) | Publication Number(#98120393) | Patent Title (General Electric Cooker) | Organization (Company C) | Assignee (Company C Chairman)",
            "Field of Specialty (Main research areas, Previous research results, Industry and international influence)：",
            "Awards and Honours", "Product introduction, current industrialization level and industry competitiveness）",
            "(E.g. ) Current - Past 2014, ADVANCES IN ENGINEERING RESEARCH, Volume 8, chapter 2, Adsorption Refrigeration, Victoria M. Petrova Editor. Nova Publishers. New York, Ahmed Rezk, Ahmed Elsayed, Saad Mahmoud, and Raya AL-Dadah.",
            "(E.g. ) Current - Past Project briefs, innovations compared to existing technologies, current developments and technical difficulties, expected results and industry, and international influence",
            "Project Proposal With China"]

        this.fieldTitle = _.zipObject(this.moreField, this.moreHeader);
        this.fieldPlaceholder = _.zipObject(this.moreField, this.morePlaceholder);
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
        this.setState({
            data: tmp_data,
            showInput: isEdit
        });
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
                                            placeholder={this.fieldPlaceholder[key]}
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
                    handleEdit={this.editHandler}
                    handleConfirm={this.confirmHandler}
                />

            </div>

        )
    }
}


