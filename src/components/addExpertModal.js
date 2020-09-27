import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UploadFile from './uploadFile';
import _ from 'lodash';
import { countryList } from '../asset/countryList';

export default class AddExpertModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }

        this.allFields = ['title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'password', 'country', 'phone_no',
            'education', 'employment', 'projects', 'patents',
            'field_of_speciality', 'awards', 'products', 'publication_date', 'recent_major_research_projects',
            'collaborative_project_proposal'];

        this.createRefByField(this.allFields);

        this.closeModal = this.closeModal.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    createRefByField(field) {
        _.forEach(field, (item, index) => {
            this[item] = React.createRef()
        });
    }

    handleAdd(e) {
        e.preventDefault();
        
        const { onAdd } = this.props;
        let obj = {
            'id': 100
        }

        _.forEach(this.allFields, (item, index) => {
            if (this[item].current) {
                obj[item] = this[item].current.value
            } else {
                obj[item] = ''
            }
        });
        onAdd(obj)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                show: nextProps.show
            })
        }
    }

    closeModal() {
        const { close } = this.props;

        this.setState({
            show: false
        }, () => {
            close(this.state.show);
        });
    }

    render() {
        const { show } = this.state;

        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={this.closeModal}>
                <Modal.Header closeButton onHide={this.closeModal} id="contained-modal-title-vcenter">
                    Expert Application Form
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleAdd}>
                        <div className='columns-add'>
                            <label>Title</label>
                            <select name="title" className="form-control"
                                    ref={this.title}>
                                <option value=''>Please Select</option>
                                <option value='Mr'>Mr</option>
                                <option value='Ms'>Ms</option>
                                <option value='Dr'>Dr</option>
                                <option value='Professor'>Professor</option>
                            </select>
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Jane" required
                                    ref={this.first_name} />
                        </div>

                        <div className='columns-add'>
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Doe" required
                                    ref={this.last_name} />
                            <label>Nationality </label>
                            <select name="country" className="form-control" required
                                    ref={this.country}>
                                {_.map(countryList, (item, index) => {
                                    return <option key={`country-${index}`} value={item}>{item}</option>
                                })}
                            </select>
                        </div>

                        <div className='columns-add'>
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="name@example.com" required 
                                    ref={this.email}/>
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="******" required 
                                    ref={this.password}/>
                        </div>

                        <div className='columns-add'>
                            <label>Expertise</label>
                            <input type="text" className="form-control" placeholder="Chemical and Material Engineer" required 
                                    ref={this.expertise}/>

                            <label>Professional Field</label>
                            <input type="text" className="form-control" placeholder="Chemical Engineer" required 
                                    ref={this.category}/>

                        </div>

                        <div className='columns-add'>
                            <label>Phone number</label>
                            <input type="tel" className="form-control" placeholder="796-644-8844" 
                                    ref={this.phone_no}/>
                            <label>Upload CV</label>
                            <UploadFile />

                        </div>

                        <div className='columns-add-merge'>
                            <h2>Education</h2>
                            {/* <div className="grid-info">
                            <label>Degree</label>
                            <label>Time</label>
                            <label>Country</label>
                            <label>University</label>
                            <label>Major</label>
                        </div> */}
                            <textarea name="education" className="form-control" rows='5' 
                                    placeholder="(E.g.) Current - Past
                                    1. Bachelor 1988/09 – 1992/07 china Peking University Mechanical Engineering"
                                    ref={this.education}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Employment</h2>
                            {/* <div className="grid-info">
                            <label>Postion</label>
                            <label>Time</label>
                            <label>Country</label>
                            <label>Employer</label>
                        </div> */}
                            <textarea name="working" className="form-control" rows='5' 
                                    placeholder="(E.g. ) Current - Past
                                    1. Principal Reseracher 20/14/09-20/17/12 USA General Electric Company"
                                    ref={this.employment}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Projects</h2>
                            {/* <div className="grid-info">
                            <label>Time</label>
                            <label>Nature and Source of Project</label>
                            <label>Total amount of budget</label>
                            <label>No of Participants</label>
                            <label>Position and Responsibility</label>
                        </div> */}
                            <textarea name="projects" className="form-control" rows='5' 
                                        placeholder="
                                        1. 20/18/01-20/19/03 | Development of manganese-based lithiumion batteries and supercapacitors (funded by DST/NRF) |$1000,0000 | 25 | R & D Manager and Principal Investigator "
                                        ref={this.projects} />
                        </div>

                        <div className='columns-add-merge'>
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
                                    1. Date Filling (2018) | Publication Number(#98120393) | Patent Title (General Electric Cooker) | Organization (Company C) | Assignee (Company C Chairman) "
                                    ref={this.patents}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Field of Speciality</h2>
                            <textarea name="fieldofspecialty" className='form-control' rows='5'
                                    placeholder="Field of Specialty (Main research areas, Previous research results, Industry and international influence)："
                                    ref={this.field_of_speciality}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Awards</h2>
                            <textarea name="awards" placeholder="Awards and Honours" className="form-control" rows='5' 
                                    ref={this.awards}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Products</h2>
                            <textarea name="products" className='form-control' rows='5'
                                    placeholder="Product introduction, current industrialization level and industry competitiveness）"
                                    ref={this.products}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Publication Date</h2>
                            {/* <div className="grid-info">
                            <label>Publication Date</label>
                            <label>Title of Paper</label>
                            <label>Publication Media</label>
                            <label>Number of Authors</label>
                            <label>Author Rank</label>
                        </div> */}
                            <textarea name="pd" className='form-control' rows='5'
                                placeholder="(E.g. ) Current - Past 2014, ADVANCES IN ENGINEERING RESEARCH, Volume 8, chapter 2, Adsorption Refrigeration, Victoria M. Petrova Editor. Nova Publishers. New York, Ahmed Rezk, Ahmed Elsayed, Saad Mahmoud, and Raya AL-Dadah."
                                ref={this.publication_date}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Recent Major Research Projects</h2>
                            <textarea name="rmrp" className='form-control' rows='5'
                                    placeholder="(E.g. ) Current - Past Project briefs, innovations compared to existing technologies, current developments and technical difficulties, expected results and industry, and international influence"
                                    ref={this.recent_major_research_projects}/>
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Collaborative Project Proposal</h2>
                            <textarea name="cpp" placeholder="Project Proposal With China" className='form-control' rows='5'
                                    ref={this.collaborative_project_proposal}/>
                        </div>
                        <Button type="submit" className='apply-btn'>Add User</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

}