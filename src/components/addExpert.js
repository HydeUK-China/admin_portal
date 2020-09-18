import React, { Component } from 'react';
import UploadFile from './uploadFile';
import _ from 'lodash';
import {countryList} from '../asset/countryList';
import '../styles/database.css';

export default class AddExpert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                show: nextProps.show
            })
        }
    }

    render() {
        const { show } = this.state;

        return (
            <div className={show ? 'showContent content' : 'content'}>
                <div className='forms-info'>
                    <center><h3>Expert Application Form</h3></center>
                    <hr />
                    <form>
                        <div className='columns'>
                            <label>Title</label>
                            <select id="title" name="title" className="form-control" required>
                                <option value='None'>Please Select</option>
                                <option value='Mr'>Mr</option>
                                <option value='Ms'>Ms</option>
                                <option value='Dr'>Dr</option>
                                <option value='Professor'>Professor</option>
                            </select>
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Jane" required />
                        </div>
                        <div className='columns'>
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Doe" required />
                            <label>Nationality </label>
                            <select id="country" name="country" className="form-control" required>
                                {_.map(countryList, (item, index) => {
                                    return <option key={`country-${index}`}>{item}</option>
                                })}
                            </select>

                        </div>
                        <div className='columns'>

                            <label>Email</label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="name@example.com" required />
                            <label>Password</label>
                            <input type="password" className="form-control" id="inputPassword4" placeholder="******" required />
                        </div>
                        <div className='columns'>
                            <label>Expertise</label>
                            <input type="tel" className="form-control" id="expertise" placeholder="Chemical and Material Engineer" required />

                            <label>Professional Field</label>
                            <input type="tel" className="form-control" id="professional_field" placeholder="Chemical Engineer" required />

                        </div>
                        <div className='columns'>
                            <label>Phone number</label>
                            <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="796-644-8844" required />

                            <label>Upload CV</label>
                            <UploadFile />
                        </div>


                        <div className='columns-merge'>
                            <h2>Education</h2>
                            <div className="grid-info">
                                <label>Degree</label>
                                <label>Time</label>
                                <label>Country</label>
                                <label>University</label>
                                <label>Major</label>
                            </div>
                            <textarea name="education" id="educationID" className="form-control" rows='5' placeholder="(E.g.) Current - Past
1. Bachelor 1988/09 – 1992/07 china Peking University Mechanical Engineering"/>
                        </div>

                        <div className='columns-merge'>
                            <h2>Employment</h2>
                            <div className="grid-info">
                                <label>Postion</label>
                                <label>Time</label>
                                <label>Country</label>
                                <label>Employer</label>
                            </div>
                            <textarea name="working" id="workingID" className="form-control" rows='5' placeholder="(E.g. ) Current - Past
1. Principal Reseracher 20/14/09-20/17/12 USA General Electric Company"/>
                        </div>

                        <div className='columns-merge'>
                            <h2>Projects</h2>
                            <div className="grid-info">
                                <label>Time</label>
                                <label>Nature and Source of Project</label>
                                <label>Total amount of budget</label>
                                <label>No of Participants</label>
                                <label>Position and Responsibility</label>
                            </div>
                            <textarea name="projects" id="projectID" className="form-control" rows='5' placeholder="
1. 20/18/01-20/19/03 | Development of manganese-based lithiumion batteries and supercapacitors (funded by DST/NRF) |$1000,0000 | 25 | R & D Manager and Principal Investigator "/>
                        </div>

                        <div className='columns-merge'>
                            <h2>Patents</h2>
                            <div className="grid-info">
                                <label>Date of Filling</label>
                                <label>Publication Number</label>
                                <label>Patent Title</label>
                                <label>State of Organization</label>
                                <label>Assignee</label>
                            </div>
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
                            <div className="grid-info">
                                <label>Publication Date</label>
                                <label>Title of Paper</label>
                                <label>Publication Media</label>
                                <label>Number of Authors</label>
                                <label>Author Rank</label>
                            </div>
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

                        <button className="apply-btn">Add New User</button>
                    </form>


                </div>


            </div>

        )
    }

}