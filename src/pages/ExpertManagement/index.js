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

        this.lessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category']
        this.lessField = ['expert_id', 'title', 'first_name', 'last_name', 'expertise', 'category']
        this.moreHeader = ['Email', 'Phone No', 'Education', 'Employment', 'Projects', 'Patents',
            'Field of Speciality', 'Awards', 'Products', 'Publication Date', 'Recent Major Research Projects',
            'Collaborative Project Proposal']
        this.moreField = ['email', 'phone_no', 'education', 'employment', 'projects', 'patents',
            'field_of_speciality', 'awards', 'products', 'publication_date', 'recent_major_research_projects',
            'collaborative_project_proposal']

        this.dataIdentifier = 'expert_id';

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handleToggleAdd = this.handleToggleAdd.bind(this);
        this.closeAddHandler = this.closeAddHandler.bind(this);
        this.rowDeleteHandler = this.rowDeleteHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.editConfirmHandler = this.editConfirmHandler.bind(this);
    }

    componentDidMount() {
        this.receiveUpdateData();
    }

    receiveUpdateData() {
        fetchReq('/api/fetchExpert/all').then(data => {
            const { offset } = this.state;
            const [totalItemsCount, slice] = sliceData(data, offset);

            this.setState({
                data,
                filterData: data,
                totalItemsCount,
                displayData: slice
            });
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
        const url = `/api/deleteExpert/${id}`
        fetchReq(url).then(feedback => {
            const { data, filterData } = this.state;

            _.remove(data, (item, index) => {
                return item[this.dataIdentifier] == id;
            });
            _.remove(filterData, (item, index) => {
                return item[this.dataIdentifier] == id;
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
        }).catch(err => alert(err));
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
        fetchReq('/api/addExpert', {
            body: JSON.stringify({
                record: obj
            })
        }).then(feedback => {
            this.setState({
                showAdd: false
            }, () => this.receiveUpdateData());
        }).catch(err => alert(err));
    }

    editConfirmHandler(record) {
        fetchReq('/api/editExpert', {
            body: JSON.stringify({
                record
            })
        }).then(feedback => {

        }).catch(err => alert(err));
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
                    useClass={'expert'}
                    data={displayData}
                    dataIdentifier={this.dataIdentifier}
                    rowLessField={this.lessField}
                    rowMoreField={this.moreField}
                    rowLessHeader={this.lessHeader}
                    rowMoreHeader={this.moreHeader}
                    onRowDelete={this.rowDeleteHandler}
                    onEditConfirm={this.editConfirmHandler}
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