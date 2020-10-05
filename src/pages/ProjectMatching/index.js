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
            innerData: null,
            activePage: 1,
            offset: 0,
            totalItemsCount: 0
        }

        this.outerLessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Salary', 'Currency', 'Close Date']
        this.outerLessField = ['project_id', 'job_title', 'start_date', 'employer', 'area', 'salary', 'currency', 'close_date']
        this.innerLessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category']
        this.innerLessField = ['expert_id', 'title', 'first_name', 'last_name', 'expertise', 'category']

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.rowClickHandler = this.rowClickHandler.bind(this);
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

        }).catch(err => alert(err));
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

    rowClickHandler(project_id) {
        const url = `/api/fetchProjectExpert/${project_id}`
        fetchReq(url).then(data => {
            this.setState({
                innerData: data
            })

        }).catch(err => alert(err));
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
        const { data, displayData, innerData, activePage, totalItemsCount } = this.state;

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
                    outerDataIdentifier={'project_id'}
                    onRowClick={this.rowClickHandler}
                    innerData={innerData}
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