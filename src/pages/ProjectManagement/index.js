import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import JobTab from '../../components/JobTab'
// import AddJob from '../../components/addJob'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal } from 'react-bootstrap'

export default class ProjectManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null
        }

        this.header = ['ID', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.dataField = ['id', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

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
        return _.map(this.header, (item, index) => {
            return <h6 key={`employerMgt-${index}`}>{item}</h6>
        })
    }

    getTable() {
        const { filterData } = this.state;
        const { role } = this.props;

        return _.map(filterData, (item, index) => {
            return <JobTab
                role={role}
                key={`JobcollapsableRow-${index}`}
                rowData={item}
                rowField={this.dataField}>

            </JobTab>
        })
    }

    handleToggleAdd = () => {
        this.setState({
            Add: !this.state.Add
        })
    }

    closeTab = () => {
        this.setState({
            Add: false,
        })
    }


    render() {
        const { data, Add } = this.state;
        const { role } = this.props;

        return (
            <div className="database">

                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.dataField}
                        filterDataHandler={this.filterDataHandler}
                    />
                    {role === '__admin__' ? <button className="search-btn" onClick={this.handleToggleAdd}>Add</button> : <div></div>}
                </div>
                <Modal show={this.state.Add}>
                    <Modal.Header closeButton onHide={this.closeTab}>Job Posting</Modal.Header>
                    <Modal.Body><form>
                        <div className='columns'>
                            <label>Job Roles</label>
                            <input type='text' placeholder="Accountant Manager" />

                        </div>
                        <div className='columns'>
                            <label>Organization</label>
                            <input type='text' placeholder="Amazon" />

                        </div>
                        <div className='columns'>
                            <label>Post Date</label>
                            <input type="date" className="form-control" required />
                            
                        </div>
                        <div className='columns'>
                        <label>Deadline </label>
                            <input type="date" className="form-control" required />
                        </div>
                        <div className='columns'>
                            <label>Salary</label>
                            <input type="text" className="form-control" placeholder=" £35,000 - 45,000" required />
                        </div>

                        <div className='columns-merge'>
                            <h2>Featured</h2>
                            <textarea name="education" id="educationID" className="form-control" rows='5' placeholder="Amazon Advertising operates at the intersection of advertising and ecommerce and offers advertisers a rich array of innovative advertising solutions across Amazon’s mobile and desktop websites, proprietary devices and the Amazon Advertising Platform." />
                        </div>

                        <div className='columns-merge'>
                            <h2>Job Description</h2>
                            <textarea name="working" id="workingID" className="form-control" rows='5' placeholder="In this role you will be working within the SME team of Account Managers, taking ownership of the management of a portfolio of SME clients and engaging with to ensure renewals and upsells." />
                        </div>

                        <div className='columns-merge'>
                            <h2>Responsibilities</h2>
                            <textarea name="projects" id="projectID" className="form-control" rows='5' placeholder="
-Onboarding and engagement process with every client.
-Identify risks to minimise attrition.
-Identify and convert opportunities to up sell and cross sell existing products.
-Create and convert cross sell opportunities.
-Establish and maintain relationship with key client stakeholders. "/>
                        </div>

                        <div className='columns-merge'>
                            <h2>Essential skills</h2>
                            <textarea name="patent" id="patentID" className="form-control" rows='5'
                                placeholder="
                                -Commercially and client focused
                                -Sales and relationship management experience
                                -Experience working to commercial KPI’s"/>
                        </div>
                    </form></Modal.Body>
                    <Modal.Footer><Button>Add Job Post</Button></Modal.Footer>
                </Modal>
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}