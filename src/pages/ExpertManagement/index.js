import React, { Component } from 'react';
import _ from 'lodash';
import Search from '../../components/search';
import ModalOpsTable from '../../components/modalOpsTable';
import { fetchReq } from '../../utils/utils';
import AddExpertModal from '../../components/addExpertModal';
import Pagination from '../../components/pagination';
import { itemsCountPerPage, sliceData } from '../../asset/paginationConfig';

export default class ExpertManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            displayData: null,
            activePage: 1,
            offset: 0,
            totalItemsCount: 0,
            showAdd: false
        }

        this.lessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No']
        this.lessField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']
        this.moreHeader = ['Education', 'Employment', 'Projects', 'Patents',
            'Field of Speciality', 'Awards', 'Products', 'Publication Date', 'Recent Major Research Projects',
            'Collaborative Project Proposal']
        this.moreField = ['education', 'employment', 'projects', 'patents',
            'field_of_speciality', 'awards', 'products', 'publication_date', 'recent_major_research_projects',
            'collaborative_project_proposal']

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handleToggleAdd = this.handleToggleAdd.bind(this);
        this.closeAddHandler = this.closeAddHandler.bind(this);
        this.rowDeleteHandler = this.rowDeleteHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
    }

    componentDidMount() {
        const { role } = this.props;
        const expertId = 1;
        const url = role === '__admin__' ? '/api/fetchExpert/all' : `/api/fetchExpert/${expertId}`
        fetchReq(url).then(data => {
            const { offset } = this.state;
            const [totalItemsCount, slice] = sliceData(data, offset);

            this.setState({
                data,
                filterData: data,
                totalItemsCount,
                displayData: slice
            });
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
        }, () => {
            const { offset, filterData } = this.state;
            const [totalItemsCount, slice] = sliceData(filterData, offset);

            this.setState({
                totalItemsCount,
                displayData: slice
            });
        });
    }

    handleToggleAdd = () => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    closeAddHandler = (hide) => {
        this.setState({
            showAdd: hide
        })
    }

    addHandler(obj) {
        const { data } = this.state;

        data.push(obj);
        this.setState({
            data,
            filterData: data,
            showAdd: false
        }, () => {
            const { offset, filterData } = this.state;
            const [totalItemsCount, slice] = sliceData(filterData, offset);

            this.setState({
                totalItemsCount,
                displayData: slice
            });
        })
    }

    render() {
        const { data, displayData, activePage, totalItemsCount, showAdd } = this.state;
        const { role } = this.props;

        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.lessField}
                        filterDataHandler={this.filterDataHandler}
                    />
                    {role === '__admin__' ? <button className="search-btn" onClick={this.handleToggleAdd}>Add</button> : null}
                </div>
                <AddExpertModal show={showAdd} close={this.closeAddHandler} onAdd={this.addHandler} />

                <ModalOpsTable
                    data={displayData}
                    rowLessField={this.lessField}
                    rowMoreField={this.moreField}
                    rowLessHeader={this.lessHeader}
                    rowMoreHeader={this.moreHeader}
                    onRowDelete={this.rowDeleteHandler}
                    modalHeader={'Expert Info'}
                    role={role}
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