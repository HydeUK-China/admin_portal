import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { currencyList } from '../asset/currencyList';

export default class AddExpertModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }

        this.allFields = ['job_title', 'start_date', 'employer', 'area', 'required_expertise', 'currency', 'salary', 'close_date',
            'featured', 'job_description', 'responsibilities', 'essential_skills'];

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
                <Modal.Header closeButton onHide={this.closeModal} id="contained-modal-title-vcenter">Job Posting</Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleAdd}>
                        <div className='columns-add'>
                            <label>Job Title</label>
                            <input type='text' placeholder="Accountant Manager" required
                                ref={this.job_title} />
                            <label>Employer</label>
                            <input type='text' placeholder="Amazon" required
                                ref={this.employer} />

                        </div>

                        <div className='columns-add'>
                            <label>Start Date</label>
                            <input type="date" className="form-control" required
                                ref={this.start_date} />
                            <label>Close Date</label>
                            <input type="date" className="form-control" required
                                ref={this.close_date} />
                        </div>

                        <div className='columns-add'>
                            <label>Salary</label>
                            <select name="currencylist" className="form-control" required
                            ref={this.currency}>
                                {_.map(currencyList, (item, index) => {
                                    return <option key={`currency-${index}`} value={item}>{item}</option>
                                })}
                            </select>
                            <input type="text" className="form-control" placeholder="35,000 - 45,000" required
                                ref={this.salary} />
                        </div>
                        <div className='columns-add'> 
                            <label>Area</label>
                            <input type="text" className="form-control" placeholder="United Kingdom" required
                                ref={this.area} /></div>

                        <div className='columns-add-merge'>
                            <h2>Featured</h2>
                            <textarea name="featured" className="form-control" rows='5' placeholder="Amazon Advertising operates at the intersection of advertising and ecommerce and offers advertisers a rich array of innovative advertising solutions across Amazon’s mobile and desktop websites, proprietary devices and the Amazon Advertising Platform."
                                ref={this.featured} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Job Description</h2>
                            <textarea name="job_description" className="form-control" rows='5' placeholder="In this role you will be working within the SME team of Account Managers, taking ownership of the management of a portfolio of SME clients and engaging with to ensure renewals and upsells."
                                ref={this.job_description} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Required Expertise</h2>
                            <textarea name="required_expertise" className="form-control" rows='5' placeholder="Management, Data, SQL"
                                ref={this.required_expertise} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Responsibilities</h2>
                            <textarea name="responsibilities" id="projectID" className="form-control" rows='5'
                                placeholder="
                                    -Onboarding and engagement process with every client.
                                    -Identify risks to minimise attrition.
                                    -Identify and convert opportunities to up sell and cross sell existing products.
                                    -Create and convert cross sell opportunities.
                                    -Establish and maintain relationship with key client stakeholders. "
                                ref={this.responsibilities} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Essential skills</h2>
                            <textarea name="essential_skills" id="patentID" className="form-control" rows='5'
                                placeholder="
                                -Commercially and client focused
                                -Sales and relationship management experience
                                -Experience working to commercial KPI’s"
                                ref={this.essential_skills} />
                        </div>
                        <Button className='apply-btn' type="submit">Add Job</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}