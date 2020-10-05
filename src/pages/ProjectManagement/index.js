import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTable from '../../components/modalOpsTable';
import AddProjectModal from '../../components/addProjectModal';
import Pagination from '../../components/pagination';
import { itemsCountPerPage, sliceData } from '../../asset/paginationConfig';

export default class ProjectManagement extends Component {
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

        this.lessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Salary', 'Currency', 'Close Date']
        this.lessField = ['project_id', 'job_title', 'start_date', 'employer', 'area', 'salary', 'currency', 'close_date']
        this.moreHeader = ['Featured', 'Job Description', 'Required Expertise', 'Responsibilities', 'Essential skills']
        this.moreField = ['featured', 'job_description', 'required_expertise', 'responsibilities', 'essential_skills']

        this.dataIdentifier = 'project_id';

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
        fetchReq('/api/fetchProject/all').then(data => {
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
        const url = `/api/deleteProject/${id}`
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
        fetchReq('/api/addProject', {
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
        fetchReq('/api/editProject', {
            body: JSON.stringify({
                record
            })
        }).then(feedback => {
            // const { data, filterData } = this.state;

            // const d_index = _.findIndex(data, (item) => {
            //     return item.project_id === record.project_id;
            // });
            // const f_index = _.findIndex(filterData, (item) => {
            //     return item.project_id === record.project_id;
            // });

            // data[d_index] = record;
            // filterData[f_index] = record;

            // this.setState({
            //     data,
            //     filterData
            // }, () => {
            //     const { offset, filterData } = this.state;
            //     const [totalItemsCount, slice] = sliceData(filterData, offset);

            //     this.setState({
            //         totalItemsCount,
            //         displayData: slice
            //     });
            // });
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
                <AddProjectModal show={showAdd} close={this.closeAddHandler} onAdd={this.addHandler} />

                <ModalOpsTable
                    useClass={'project'}
                    data={displayData}
                    dataIdentifier={this.dataIdentifier}
                    rowLessField={this.lessField}
                    rowMoreField={this.moreField}
                    rowLessHeader={this.lessHeader}
                    rowMoreHeader={this.moreHeader}
                    onRowDelete={this.rowDeleteHandler}
                    onEditConfirm={this.editConfirmHandler}
                    modalHeader={'Project Info'}
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