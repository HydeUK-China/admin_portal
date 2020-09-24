import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';

export default class AddExpertModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }

        this.closeModal = this.closeModal.bind(this);
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
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} >
                <Modal.Header closeButton onHide={this.closeModal} id="contained-modal-title-vcenter">Job Posting</Modal.Header>
                <Modal.Body>
                    <form>
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Add Job Post</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}