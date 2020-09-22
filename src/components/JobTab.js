import React, { Component } from 'react';
import _ from 'lodash';
import DisplayJob from './displayJob'
import EditJob from './editJob'
import '../styles/database.css';
import { Button, Modal } from 'react-bootstrap'



export default class JobTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
            showEdit: false
        }

        // this.handleToggleShow = this.handleToggleShow.bind(this)
        // this.handleToggleEdit = this.handleToggleEdit.bind(this)
        // this.handleToggleRemove = this.handleToggleRemove.bind(this)
        // this.handleToggleAdd = this.handleToggleAdd.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(e) {
        if (e.target.value === 'MoreInfo') {
            this.setState({
                showInfo: !this.showInfo,
                showEdit: this.showEdit
            })
        } else if (e.target.value === 'Edit') {
            this.setState({
                showEdit: !this.showEdit,
                showInfo: this.showInfo

            })
        }
        else if (e.target.value === 'Remove') {
            this.setState({
                showRemove: alert('Are you sure you want to remove?')
            })
        }

        else if (e.target.value === 'Close') {
            this.setState({
                showInfo: false,
                showEdit: false
            })
        }
    }


    handleToggleShow = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    }

    // handleToggleEdit = () => {
    //     this.setState({
    //         showEdit: !this.state.showEdit
    //     })
    // }

    // handleToggleRemove = () => {
    //     alert('Remove Expert Data?')
    // }


    // handleToggleAdd = () => {
    //     this.setState({
    //         showAdd: !this.state.showAdd
    //     })
    // }

    closeTab = () => {
        this.setState({
            showInfo: false,
            showEdit: false
        })
    }

    render() {

        const { rowData, rowField, DisplayButton, EditButton, RemoveButton, role } = this.props;
        // const { showAdd } = this.state;

        return (
            <div className='database'>

                <div className="datatable_expert">
                    {_.map(_.pick(rowData, rowField), (item, index) => {
                        return <label key={`row-${index}`}>{item}</label>
                    })
                    }

                    {role === '__admin__' ? <select className='more-info-btn' onChange={this.handleSelect}>
                        <option value=''>Please Select</option>
                        <option value='MoreInfo'>More info</option>
                        <option value='Edit'>Edit</option>
                        <option value='Remove'>Remove</option>
                        {/* <option value='Add'>Add</option> */}
                    </select> : <button className='more-info-btn' onClick={this.handleToggleShow}>
                            More Info</button>}


                    {/* <button className="more-info-btn" onClick={this.handleToggleShow}>
                        {DisplayButton}
                    </button>
                    <button className="more-info-btn" onClick={this.handleToggleEdit}>
                        {EditButton}
                    </button>
                    <button className="more-info-btn" onClick={this.handleToggleRemove}>
                        {RemoveButton}
                    </button>
                    <button className="more-info-btn" onClick={this.handleToggleAdd}>
                        {AddButton}
                    </button> */}
                </div>

                {/* Job Display */}

                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                    show={this.state.showInfo} >
                    <Modal.Header closeButton onHide={this.closeTab} id="contained-modal-title-vcenter">Job Info</Modal.Header>

                    <Modal.Body>
                        <div className='container'>
                            <div className='columns-add-merge'>
                                <h4>Featured</h4>
                                <label>Display Featured Info</label>
                            </div>

                            <div className='columns-add-merge'>
                                <h4>Job Description</h4>
                                <label>Display Job Description</label>                        </div>

                            <div className='columns-add-merge'>
                                <h4>Responsibilities</h4>
                                <label>Display Responsibilities</label>                        </div>

                            <div className='columns-add-merge'>
                                <h4>Essential skills</h4>
                                <label>Display Essnetil Skill</label>                        </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer><Button>Download</Button></Modal.Footer>


                </Modal>

                {/* End Job Display */}

                {/* Job Edit */}
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                    show={this.state.showEdit} >
                    <Modal.Header closeButton onHide={this.closeTab} id="contained-modal-title-vcenter">Job Info (Edit Version)</Modal.Header>

                    <Modal.Body>
                        <div className='container'>
                            <div className='columns-add'>
                                <label>Job Roles</label>
                                <input type='text' placeholder="Accountant Manager" />
                                <label>Organization</label>
                                <input type='text' placeholder="Amazon" />

                            </div>
                            
                            <div className='columns-add'>
                                <label>Post Date</label>
                                <input type="date" className="form-control" required />
                                <label>Deadline </label>
                                <input type="date" className="form-control" required />

                            </div>
                           
                            <div className='columns-add'>
                                <label>Salary</label>
                                <input type="text" className="form-control" placeholder=" £35,000 - 45,000" required />
                            </div>

                            <div className='columns-add-merge'>
                                <h2>Featured</h2>
                                <textarea name="education" id="educationID" className="form-control" rows='5' placeholder="Amazon Advertising operates at the intersection of advertising and ecommerce and offers advertisers a rich array of innovative advertising solutions across Amazon’s mobile and desktop websites, proprietary devices and the Amazon Advertising Platform." />
                            </div>

                            <div className='columns-add-merge'>
                                <h2>Job Description</h2>
                                <textarea name="working" id="workingID" className="form-control" rows='5' placeholder="In this role you will be working within the SME team of Account Managers, taking ownership of the management of a portfolio of SME clients and engaging with to ensure renewals and upsells." />
                            </div>

                            <div className='columns-add-merge'>
                                <h2>Responsibilities</h2>
                                <textarea name="projects" id="projectID" className="form-control" rows='5' placeholder="
-Onboarding and engagement process with every client.
-Identify risks to minimise attrition.
-Identify and convert opportunities to up sell and cross sell existing products.
-Create and convert cross sell opportunities.
-Establish and maintain relationship with key client stakeholders. "/>
                            </div>

                            <div className='columns-add-merge'>
                                <h2>Essential skills</h2>
                                <textarea name="patent" id="patentID" className="form-control" rows='5'
                                    placeholder="
                                -Commercially and client focused
                                -Sales and relationship management experience
                                -Experience working to commercial KPI’s"/>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer><Button>Save</Button>
                    </Modal.Footer>


                </Modal>


            </div>


        );
    }

}