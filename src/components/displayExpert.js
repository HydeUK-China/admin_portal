import React, { Component } from 'react'

import '../styles/search.css'
import '../styles/database.css'

export default class DisplayExpert extends Component {
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
                        <label>Display Education info</label>
                    </div>

                    <div className='columns-merge'>
                        <h2>Employment</h2>
                        <div className="grid-info">
                            <label>Postion</label>
                            <label>Time</label>
                            <label>Country</label>
                            <label>Employer</label>
                        </div>
                        <label>Display Employment info</label>                    </div>

                    <div className='columns-merge'>
                        <h2>Projects</h2>
                        <div className="grid-info">
                            <label>Time</label>
                            <label>Nature and Source of Project</label>
                            <label>Total amount of budget</label>
                            <label>No of Participants</label>
                            <label>Position and Responsibility</label>
                        </div>
                        <label>Display Projects info</label>                    </div>

                    <div className='columns-merge'>
                        <h2>Patents</h2>
                        <div className="grid-info">
                            <label>Date of Filling</label>
                            <label>Publication Number</label>
                            <label>Patent Title</label>
                            <label>State of Organization</label>
                            <label>Assignee</label>
                        </div>
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
                        <div className="grid-info">
                            <label>Publication Date</label>
                            <label>Title of Paper</label>
                            <label>Publication Media</label>
                            <label>Number of Authors</label>
                            <label>Author Rank</label>
                        </div>
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

                <div>
                    <button className='download-btn'>Download</button>
                </div>
            </div>
        )
    }
}