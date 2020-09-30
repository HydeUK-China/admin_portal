import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTables from '../../components/modalOpsTables';
import Pagination from '../../components/pagination';

export default class ProjectMatching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            activePage: 1,
            offset: 0,
            totalItemsCount: 0
        }

        this.outerLessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Currency', 'Salary', 'Close Date']
        this.outerLessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'currency', 'salary', 'close_date']
        this.innerLessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No']
        this.innerLessField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

        this.itemsCountPerPage = 1

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchProjectMatching').then(data => {
            this.setState({
                data,
                filterData: data
            }, () => this.sliceData());
            
        }).catch(err => console.log(err));
    }

    sliceData(curData) {
        const { data, filterData, offset } = this.state;
        const slice = _.slice(data, offset, offset + this.itemsCountPerPage);
        
        this.setState({
            totalItemsCount: data.length,
            filterData: slice
        }, ()=>console.log(offset, this.state.totalItemsCount, this.state.filterData))
    }

    filterDataHandler(filterData) {
        this.setState({
            filterData
        })
    }

    handlePageClick = (pageNumber) => {
        const pageIndex = pageNumber - 1;
        const offset = pageIndex * this.itemsCountPerPage;
        
        this.setState({
            activePage: pageNumber,
            offset: offset
        }, () => {
            this.sliceData()
        });

    };

    render() {
        const { data, filterData, activePage, totalItemsCount } = this.state;

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

                <hr />
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={this.itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    onPageChange={this.handlePageClick}
                />
            </div>
        )
    }
}