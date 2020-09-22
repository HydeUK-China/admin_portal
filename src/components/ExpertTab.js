import React, { Component } from 'react';
import _ from 'lodash';
import DisplayExpert from './displayExpert';
import EditExpert from './editExpert'
import '../styles/database.css';
import { Button, Modal } from 'react-bootstrap'


export default class ExpertTab extends Component {
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

        const { rowData, rowField, DisplayButton, EditButton, RemoveButton, role, children } = this.props;
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

                <Modal show={this.state.showInfo}>
                    <Modal.Header closeButton onHide={this.closeTab}>Job Info</Modal.Header>

                    <Modal.Body>
                        <div className='content-general-info'>
                            <div className='columns-merge'>
                                <h2>Education</h2>
                                {/* <div className="grid-info">
                                    <label>Degree</label>
                                    <label>Time</label>
                                    <label>Country</label>
                                    <label>University</label>
                                    <label>Major</label>
                                </div> */}
                                <label>Display Education info</label>
                            </div>

                            <div className='columns-merge'>
                                <h2>Employment</h2>
                                {/* <div className="grid-info">
                                    <label>Postion</label>
                                    <label>Time</label>
                                    <label>Country</label>
                                    <label>Employer</label>
                                </div> */}
                                <label>Display Employment info</label>                    </div>

                            <div className='columns-merge'>
                                <h2>Projects</h2>
                                {/* <div className="grid-info">
                                    <label>Time</label>
                                    <label>Nature and Source of Project</label>
                                    <label>Total amount of budget</label>
                                    <label>No of Participants</label>
                                    <label>Position and Responsibility</label>
                                </div> */}
                                <label>Display Projects info</label>                    </div>

                            <div className='columns-merge'>
                                <h2>Patents</h2>
                                {/* <div className="grid-info">
                                    <label>Date of Filling</label>
                                    <label>Publication Number</label>
                                    <label>Patent Title</label>
                                    <label>State of Organization</label>
                                    <label>Assignee</label>
                                </div> */}
                                <label>Display Patents info</label>                    </div>

                            <div className='columns-merge'>
                                <h2>Field of Speciality</h2>
                                <label>Display Field of speciality info</label>                    </div>

                            <div className='columns-merge'>
                                <h2>Awards</h2>

                                <label>Display Awards info</label>
                            </div>

                            <div className='columns-merge'>
                                <h2>Products</h2>

                                <label>Display Products info</label>                    </div>
                            <div className='columns-merge'>
                                <h2>Publication Date</h2>
                                {/* <div className="grid-info">
                                    <label>Publication Date</label>
                                    <label>Title of Paper</label>
                                    <label>Publication Media</label>
                                    <label>Number of Authors</label>
                                    <label>Author Rank</label>
                                </div> */}
                                <label>Display Publication date info</label>
                            </div>

                            <div className='columns-merge'>
                                <h2>Recent Major Research Projects</h2>
                                <label>Display Recent Major Research Projects info</label>                    </div>

                            <div className='columns-merge'>
                                <h2>Collaborative Project Proposal</h2>
                                <label>Display Collaborative Project Proposal info</label>
                            </div>


                        </div>

                    </Modal.Body>
                    <Modal.Footer><Button>Download</Button></Modal.Footer>


                </Modal>

                {/* Edit Expert Modal */}
                <Modal show={this.state.showEdit}>
                    <Modal.Header closeButton onHide={this.closeTab}>
                        Expert Info (Edit Version)
                    </Modal.Header>
                    <Modal.Body>
                        <div className='content-general-info'>
                            <div className='columns-merge'>
                                <h2>Education</h2>
                                {/* <div className="grid-info">
                                    <label>Degree</label>
                                    <label>Time</label>
                                    <label>Country</label>
                                    <label>University</label>
                                    <label>Major</label>
                                </div> */}
                                <textarea name="education" id="educationID" className="form-control" rows='5' placeholder="(E.g.) Current - Past
1. Bachelor 1988/09 – 1992/07 china Peking University Mechanical Engineering"/>
                            </div>

                            <div className='columns-merge'>
                                <h2>Employment</h2>
                                {/* <div className="grid-info">
                                    <label>Postion</label>
                                    <label>Time</label>
                                    <label>Country</label>
                                    <label>Employer</label>
                                </div> */}
                                <textarea name="working" id="workingID" className="form-control" rows='5' placeholder="(E.g. ) Current - Past
1. Principal Reseracher 20/14/09-20/17/12 USA General Electric Company"/>
                            </div>

                            <div className='columns-merge'>
                                <h2>Projects</h2>
                                {/* <div className="grid-info">
                                    <label>Time</label>
                                    <label>Nature and Source of Project</label>
                                    <label>Total amount of budget</label>
                                    <label>No of Participants</label>
                                    <label>Position and Responsibility</label>
                                </div> */}
                                <textarea name="projects" id="projectID" className="form-control" rows='5' placeholder="
1. 20/18/01-20/19/03 | Development of manganese-based lithiumion batteries and supercapacitors (funded by DST/NRF) |$1000,0000 | 25 | R & D Manager and Principal Investigator "/>
                            </div>

                            <div className='columns-merge'>
                                <h2>Patents</h2>
                                {/* <div className="grid-info">
                                    <label>Date of Filling</label>
                                    <label>Publication Number</label>
                                    <label>Patent Title</label>
                                    <label>State of Organization</label>
                                    <label>Assignee</label>
                                </div> */}
                                <textarea name="patent" id="patentID" className="form-control" rows='5'
                                    placeholder="(E.g. ) Current - Past
1. Date Filling (2018) | Publication Number(#98120393) | Patent Title (General Electric Cooker) | Organization (Company C) | Assignee (Company C Chairman) "/>
                            </div>

                            <div className='columns-merge'>
                                <h2>Field of Speciality</h2>
                                <textarea name="fieldofspecialty" className='form-control' rows='5'
                                    placeholder="Field of Specialty (Main research areas, Previous research results, Industry and international influence)："
                                />
                            </div>

                            <div className='columns-merge'>
                                <h2>Awards</h2>

                                <textarea name="awards" placeholder="Awards and Honours" className="form-control" rows='5' />
                            </div>

                            <div className='columns-merge'>
                                <h2>Products</h2>

                                <textarea name="products" className='form-control' rows='5'
                                    placeholder="Product introduction, current industrialization level and industry competitiveness）"
                                />
                            </div>
                            <div className='columns-merge'>
                                <h2>Publication Date</h2>
                                {/* <div className="grid-info">
                                    <label>Publication Date</label>
                                    <label>Title of Paper</label>
                                    <label>Publication Media</label>
                                    <label>Number of Authors</label>
                                    <label>Author Rank</label>
                                </div> */}
                                <textarea name="pd" className='form-control' rows='5'
                                    placeholder="(E.g. ) Current - Past 
2014, ADVANCES IN ENGINEERING RESEARCH, Volume 8, chapter 2, Adsorption Refrigeration, Victoria M. Petrova Editor. Nova Publishers. New York, Ahmed Rezk, Ahmed Elsayed, Saad Mahmoud, and Raya AL-Dadah."
                                />
                            </div>

                            <div className='columns-merge'>
                                <h2>Recent Major Research Projects</h2>
                                <textarea name="rmrp" className='form-control' rows='5'
                                    placeholder="(E.g. ) Current - Past 
Project briefs, innovations compared to existing technologies, current developments and technical difficulties, expected results and industry, and international influence"
                                />
                            </div>

                            <div className='columns-merge'>
                                <h2>Collaborative Project Proposal</h2>
                                <textarea name="cpp" placeholder="Project Proposal With China" className='form-control' rows='5'
                                />
                            </div>


                        </div>





                    </Modal.Body>
                    <Modal.Footer> <Button>Edit</Button></Modal.Footer>
                </Modal>






                {/* <Add show={showAdd} /> */}

            </div>


        );
    }

}