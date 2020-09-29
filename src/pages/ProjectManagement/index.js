import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsTable from '../../components/modalOpsTable';
import AddProjectModal from '../../components/addProjectModal';
import Pagination from '../../components/pagination';

export default class ProjectManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            showAdd: false
        }

        this.lessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Currency', 'Salary', 'Close Date']

        this.lessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'currency', 'salary', 'close_date']

        this.moreHeader = ['Featured', 'Job Description', 'Required Expertise', 'Responsibilities', 'Essential skills']

        this.moreField = ['featured', 'job_description', 'required_expertise', 'responsibilities', 'essential_skills']

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handleToggleAdd = this.handleToggleAdd.bind(this);
        this.closeAddHandler = this.closeAddHandler.bind(this);
        this.rowDeleteHandler = this.rowDeleteHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchProject/all').then(data => {
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
        const { data, filterData } = this.state;

        data.push(obj);
        this.setState({
            data,
            filterData,
            showAdd: false
        })
    }

    render() {
        const { data, filterData, showAdd } = this.state;
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
                    data={filterData}
                    rowLessField={this.lessField}
                    rowMoreField={this.moreField}
                    rowLessHeader={this.lessHeader}
                    rowMoreHeader={this.moreHeader}
                    onRowDelete={this.rowDeleteHandler}
                    modalHeader={'Project Info'}
                    role={role}
                />
                <hr />
                <Pagination />

            </div>
        )
    }
}