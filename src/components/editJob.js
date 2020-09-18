import React, { Component } from 'react';
import UploadFile from './uploadFile';
import _ from 'lodash';
import { countryList } from '../asset/countryList';
import '../styles/database.css';

export default class AddProject extends Component {
    render() {

        return (

            <div className='forms-info'>
                <form>
                    <div className='columns'>
                        <label>Job Roles</label>
                        <input type='text' placeholder="Accountant Manager" />
                        <label>Organization</label>
                        <input type='text' placeholder="Amazon" />

                    </div>
                    <div className='columns'>
                        <label>Post Date</label>
                        <input type="date" className="form-control" required />
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

                    <button className="edit-btn">Edit</button>
                    <button className="download-btn">Download</button>
                </form>


            </div>



        )
    }

}