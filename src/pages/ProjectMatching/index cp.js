import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';

import EditExpert from '../../components/editExpert';

import '../../styles/project_matching.css';
import JobTab from '../../components/JobTab';
import ExpertTab from '../../components/ExpertTab';
import MatchingJobTab from '../../components/matchingTab';
import DisplayExpert from '../../components/displayExpert';
import ModalModalOpsRow from '../../components/modalModalOpsRow';

export default class ProjectMatching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null
        }


        this.outerLessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.outerLessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

        this.outerMoreHeader = ['Featured', 'Job Description', 'Responsibilities', 'Essential skills']

        this.outerMoreField = ['featured', 'job_description', 'responsibilities', 'essential_skills']


        this.innerLessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No']

        this.innerLessField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

        this.innerMoreHeader = ['Education', 'Employment', 'Projects', 'Patents',
        'Field of Speciality', 'Awards', 'Products', 'Publication Date', 'Recent Major Research Projects', 
        'Collaborative Project Proposal']

        this.innerMoreField = ['education', 'employment', 'projects', 'patents',
        'field_of_speciality', 'awards', 'products', 'publication_date', 'recent_major_research_projects', 
        'collaborative_project_proposal']


        this.filterDataHandler = this.filterDataHandler.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchProjectMatching').then(data => {
            this.setState({
                data,
                filterData: data
            })
        }).catch(err => console.log(err));
    }

    filterDataHandler(filterData) {
        this.setState({
            filterData
        })
    }

    rowDeleteHandler(id) {
        const { data, filterData } = this.state;
        _.remove(data, (item, index) => {
            return item.id == id;
        });
        _.remove(filterData, (item, index) => {
            return item.id == id;
        });

        this.setState({
            data,
            filterData
        });
    }

    getOuterHeader() {
        return _.map(this.outerLessHeader, (item, index) => {
            return <h6 key={`projectMgt-${index}`}>{item}</h6>
        })
    }

    getOuterTable() {
        const { filterData } = this.state;
        const { role } = this.props;
        return _.map(filterData, (item, index) => {
            return <ModalModalOpsRow 
                        role={role}
                        key={`JobcollapsableRow-${index}`}
                        rowData={item}
                        rowLessField={this.lessField}
                        // rowMoreField={this.lessField.concat(this.moreField)}
                        // rowMoreHeader={this.lessHeader.concat(this.moreHeader)}
                        onRowDelete={role === '__admin__' ? this.rowDeleteHandler : null}
                        // modalHeader='Project Info'
                    />
        })
    }

    getInnerHeader() {
        return _.map(this.innerHeader, (item, index) => {
            return <h6 key={`expertMgt-${index}`}>{item}</h6>
        })
    }

    getInnerTable(data) {
        return _.map(data, (item, index) => {
            return <MatchingJobTab
                key={`collapsableRow-${index}`}
                rowData={item}
                rowField={this.innerDataField}
            >
                <DisplayExpert />
            </MatchingJobTab>
        })
    }

    render() {
        const { data } = this.state;
        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.outerDataField}
                        filterDataHandler={this.filterDataHandler}
                    />
                </div>

                <div className="dataheader_expert">
                    {this.getOuterHeader()}
                </div>
                {this.getOuterTable()}
            </div>
        )
    }
}