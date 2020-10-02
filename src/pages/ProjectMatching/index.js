import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTables from '../../components/modalOpsTables';
import Pagination from '../../components/pagination';
import { itemsCountPerPage, sliceData } from '../../asset/paginationConfig';

export default class ProjectMatching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            displayData: null,
            activePage: 1,
            offset: 0,
            totalItemsCount: 0
        }

        this.outerLessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Currency', 'Salary', 'Close Date']
        this.outerLessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'currency', 'salary', 'close_date']
        this.innerLessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No']
        this.innerLessField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchProjectMatching').then(data => {
            const { offset } = this.state;
            const [totalItemsCount, slice] = sliceData(data, offset);

            this.setState({
                data,
                filterData: data,
                totalItemsCount,
                displayData: slice
            })

        }).catch(err => console.log(err));
    }

    filterDataHandler(filterData) {
        const { offset } = this.state;
        const [totalItemsCount, slice] = sliceData(filterData, offset);

        this.setState({
            totalItemsCount,
            filterData,
            displayData: slice
        });
    }

    handlePageClick = (pageNumber) => {
        const pageIndex = pageNumber - 1;
        const offset = pageIndex * itemsCountPerPage;
       
        this.setState({
            activePage: pageNumber,
            offset
        }, () => {
            const { offset, filterData } = this.state;
            const [totalItemsCount, slice] = sliceData(filterData, offset);

            this.setState({
                totalItemsCount,
                displayData: slice
            })
        });
    };

    render() {
        const { data, displayData, activePage, totalItemsCount } = this.state;

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
                    outerData={displayData}
                />

                <hr />
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    onPageChange={this.handlePageClick}
                />
            </div>
        )
    }
}