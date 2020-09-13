import React, { Component } from 'react'

import '../styles/search.css'
import '../styles/database.css'

export default class ExpertCV extends Component {
    render() {
        return (
            <div>
                <div className='content-general-info'>
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


                </div>

                <div>
                    <button className='edit-btn'>Edit</button>
                    <button className='download-btn'>Download</button>
                </div>
            </div>
        )
    }
}