import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsRow from '../../components/modalOpsRow';
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

        this.lessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.lessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

        this.moreHeader = ['Featured', 'Job Description', 'Responsibilities', 'Essential skills']

        this.moreField = ['featured', 'job_description', 'responsibilities', 'essential_skills']

        this.filterDataHandler = this.filterDataHandler.bind(this);
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

    getHeader() {
        return _.map(this.lessHeader, (item, index) => {
            return <h6 key={`employerMgt-${index}`}>{item}</h6>
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

    getTable() {
        const { filterData } = this.state;
        const { role } = this.props;

        return _.map(filterData, (item, index) => {
            return <ModalOpsRow
                role={role}
                key={`projectRow-${index}`}
                rowData={item}
                rowLessField={this.lessField}
                rowMoreField={this.lessField.concat(this.moreField)}
                rowMoreHeader={this.lessHeader.concat(this.moreHeader)}
                onRowDelete={role === '__admin__' ? this.rowDeleteHandler : null}
                modalHeader='Project Info'
            />
        })
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
        const { data, showAdd } = this.state;
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
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
                <hr/>
                <Pagination />
                
            </div>
        )
    }
}