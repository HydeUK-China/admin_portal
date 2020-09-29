import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTables from '../../components/modalOpsTables';

export default class ProjectMatching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null
        }

        this.outerLessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Currency', 'Salary', 'Close Date']
        this.outerLessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'currency', 'salary', 'close_date']
        this.innerLessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No']
        this.innerLessField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

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

    render() {
        const { data, filterData } = this.state;

        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.outerLessField}
                        filterDataHandler={this.filterDataHandler}
                    />
                </div>

                <ModalOpsTables
                    outerLessHeader={this.outerLessHeader}
                    outerLessField={this.outerLessField}
                    innerLessHeader={this.innerLessHeader}
                    innerLessField={this.innerLessField}
                    outerData={filterData}
                />
            </div>
        )
    }
}