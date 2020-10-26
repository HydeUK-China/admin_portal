import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTable from '../../components/modalOpsTable';
import AddProjectModal from '../../components/addProjectModal';
import Pagination from '../../components/pagination';
import { itemsCountPerPage, sliceData } from '../../asset/paginationConfig';
import { projectDataLessField, projectDataLessHeader, projectDataMoreField, projectDataMoreHeader } from '../../asset/dataFieldHeader';

export default class ProjectManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            displayData: null,
            sortKey: 'project_id',
            sortOrder: 'desc',
            activePage: 1,
            offset: 0,
            totalItemsCount: 0,
            showAdd: false
        }

        this.lessHeader = projectDataLessHeader;
        this.lessField = projectDataLessField;
        this.moreHeader = projectDataMoreHeader;
        this.moreField = projectDataMoreField;

        this.dataIdentifier = 'project_id';

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handleToggleAdd = this.handleToggleAdd.bind(this);
        this.closeAddHandler = this.closeAddHandler.bind(this);
        this.rowDeleteHandler = this.rowDeleteHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.editConfirmHandler = this.editConfirmHandler.bind(this);
        this.sortTableHandler = this.sortTableHandler.bind(this);
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
                return item[this.dataIdentifier] === id;
            });
            _.remove(filterData, (item, index) => {
                return item[this.dataIdentifier] === id;
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
        const { data, displayData, activePage, totalItemsCount, showAdd, sortKey, sortOrder } = this.state;
        const { role } = this.props;

        return (
            <div className="database">

                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.lessField.concat(this.moreField)}
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
                    onSortTable={this.sortTableHandler}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
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