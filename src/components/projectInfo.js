import React, { Component } from 'react'

import '../styles/database.css'

export default class ProjectInfo extends Component {
    render() {
        return (
            <div>
                <div className='content-general-info'>
                    <div className='grid-info'>
                        <h5>Job Description :</h5><p>Display job description info</p>

                        <h5>Job requirement skills :</h5><p>Display job skills info</p>
                        <h5>Job Task :</h5><p>Display job task info</p>
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