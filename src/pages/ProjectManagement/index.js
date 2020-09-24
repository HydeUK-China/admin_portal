import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import ModalOpsRow from '../../components/modalOpsRow';
import AddProjectModal from '../../components/addProjectModal';

export default class ProjectManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            showAdd: false
        }

        this.lessHeader = ['ID', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.lessField = ['id', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

        this.moreHeader = ['Featured', 'Job Description', 'Responsibilities', 'Essential skills']

        this.moreField = ['featured', 'job_description', 'responsibilities', 'essential_skills']

        this.filterDataHandler = this.filterDataHandler.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchProject').then(data => {
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
                <AddProjectModal show={showAdd} close={this.closeAddHandler}/>
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}