import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTables from '../../components/modalOpsTables';
import Pagination from '../../components/pagination';
import { itemsCountPerPage, sliceData } from '../../asset/paginationConfig';
import { projectMatchingDataLessField, projectMatchingDataLessHeader, expertDataLessField, expertDataLessHeader, expertDataMoreField, expertDataMoreHeader } from '../../asset/dataFieldHeader';
import ReactGA from 'react-ga'

export default class ProjectMatching extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            displayData: null,
            innerData: null,
            sortKey: 'matching_id',
            sortOrder: 'desc',
            activePage: 1,
            offset: 0,
            totalItemsCount: 0
        }

        this.outerLessHeader = projectMatchingDataLessHeader;
        this.outerLessField = projectMatchingDataLessField;
        this.innerLessHeader = expertDataLessHeader;
        this.innerLessField = expertDataLessField;
        this.innerMoreHeader = expertDataMoreHeader;
        this.innerMoreField = expertDataMoreField;

        this.dataIdentifier = 'project_id';

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.rowClickHandler = this.rowClickHandler.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.sortTableHandler = this.sortTableHandler.bind(this);
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
    }

    sortTableHandler(key) {
        const { filterData, sortKey, sortOrder } = this.state;

        const order = key === sortKey ? _.filter(['desc', 'asc'], o => o !== sortOrder)[0] : 'desc';
        const temp_data = _.orderBy(filterData, key, order);

        this.setState({
            filterData: temp_data,
            sortKey: key,
            sortOrder: order
        }, () => {
            const { offset, filterData } = this.state;
            const [totalItemsCount, slice] = sliceData(filterData, offset);

            this.setState({
                totalItemsCount,
                displayData: slice
            })
        })
    }

    render() {
        const { data, displayData, innerData, activePage, totalItemsCount, sortKey, sortOrder } = this.state;
        ReactGA.pageview(window.location.pathname + window.location.search);
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
                    innerMoreHeader={this.innerLessHeader.concat(this.innerMoreHeader)}
                    innerMoreField={this.innerLessField.concat(this.innerMoreField)}
                    outerData={displayData}
                    onSortTable={this.sortTableHandler}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    outerDataIdentifier={this.dataIdentifier}
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