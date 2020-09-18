import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';

import EditExpert from '../../components/editExpert';

import '../../styles/project_matching.css';
import JobTab from '../../components/JobTab';
import ExpertTab from '../../components/ExpertTab';

export default class ProjectMatching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null
        }

        this.outerHeader = ['ID', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.outerDataField = ['id', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

        this.innerHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No', 'CV']

        this.innerDataField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

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

    getOuterHeader() {
        return _.map(this.outerHeader, (item, index) => {
            return <h6 key={`employerMgt-${index}`}>{item}</h6>
        })
    }

    getOuterTable() {
        const { filterData } = this.state;
        const  { role } = this.props;
        return _.map(filterData, (item, index) => {
            return <JobTab
                role={role}
                key={`JobcollapsableRow-${index}`}
                rowData={item}
                rowField={this.outerDataField}
            >
                <div>
                    <div className="dataheader_expert">
                        {this.getInnerHeader()}
                    </div>
                    {this.getInnerTable(item.expertData)}
                </div>
            </JobTab>
        })
    }

    getInnerHeader() {
        return _.map(this.innerHeader, (item, index) => {
            return <h6 key={`expertMgt-${index}`}>{item}</h6>
        })
    }

    getInnerTable(data) {
        return _.map(data, (item, index) => {
            return <ExpertTab
                key={`collapsableRow-${index}`}
                rowData={item}
                rowField={this.innerDataField}
            >
                <EditExpert />
            </ExpertTab>
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