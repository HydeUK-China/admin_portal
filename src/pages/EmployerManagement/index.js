import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import JobTab from '../../components/JobTab';
import EmployerInfo from '../../components/employerInfo';

export default class EmployerManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null
        }

        this.header = ['ID', 'Title', 'First Name', 'Last Name', 'Organization',
            'Email', 'Phone No', 'Nationality']

        this.dataField = ['id', 'title', 'first_name', 'last_name', 'organization', 'email', 'phone_no', 'nationality']

        this.filterDataHandler = this.filterDataHandler.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchEmployer').then(data => {
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

    getHeader() {
        return _.map(this.header, (item, index) => {
            return <h6 key={`employerMgt-${index}`}>{item}</h6>
        })
    }

    getTable() {
        const { filterData } = this.state;

        return _.map(filterData, (item, index) => {
            return <JobTab
                key={`collapsableRow-${index}`}
                rowData={item}
                rowField={this.dataField}
                showMoreButtonText={'More info'}>
                <EmployerInfo />
            </JobTab>
        })
    }

    render() {
        const { data } = this.state;

        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.dataField}
                        filterDataHandler={this.filterDataHandler}
                    />
                </div>
                
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}