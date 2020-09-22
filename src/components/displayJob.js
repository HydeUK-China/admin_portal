import React, { Component } from 'react';
import _ from 'lodash';

import '../styles/database.css';
import { Button, Modal } from 'react-bootstrap'

export default class AddProject extends Component {
constructor(props) {
    super(props)

    this.state = {
         value: false
    }
}

close = () => {
    this.setState({
        value: !this.state.value
    })
}

    render() {
        return (
            <Modal show={!this.state.value}>
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
                <Button onClick={this.close}>Close</Button>
            </Modal>



        )
    }

}