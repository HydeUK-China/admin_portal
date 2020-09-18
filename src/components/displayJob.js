import React, { Component } from 'react';
import UploadFile from './uploadFile';
import _ from 'lodash';
import { countryList } from '../asset/countryList';
import '../styles/database.css';

export default class AddProject extends Component {

    render() {
        return (

            <div className='forms-info'>
                <center><h3>Job Posting</h3></center>
                <hr />
                <form>
                    <div className='columns-merge'>
                        <h2>Featured</h2>
                        <label>Display Featured Info</label>
                    </div>

                    <div className='columns-merge'>
                        <h2>Job Description</h2>
                        <label>Display Job Description</label>                        </div>

                    <div className='columns-merge'>
                        <h2>Responsibilities</h2>
                        <label>Display Responsibilities</label>                        </div>

                    <div className='columns-merge'>
                        <h2>Essential skills</h2>
                        <label>Display Essnetil Skill</label>                        </div>

                    <button className="download-btn">Download</button>
                </form>


            </div>


            

        )
    }

}