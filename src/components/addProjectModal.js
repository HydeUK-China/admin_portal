import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { currencyList } from '../asset/currencyList';
import { placeholder } from '../asset/placeholder';
import { projectDataLessField, projectDataMoreField } from '../asset/dataFieldHeader';

export default class AddExpertModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }

        this.allFields = this.createFields();

        this.createRefByField(this.allFields);

        this.closeModal = this.closeModal.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    createFields() {
        let fields = projectDataLessField.concat(projectDataMoreField);
        _.pullAll(fields, ['project_id']);

        return fields;
    }

    createRefByField(field) {
        _.forEach(field, (item, index) => {
            this[item] = React.createRef()
        });
    }

    handleAdd(e) {
        e.preventDefault();

        const { onAdd } = this.props;
        let obj = {}

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
                            <input type='text' className="form-control" placeholder={placeholder.job_title} required
                                ref={this.job_title} />
                            <label>Area</label>
                            <input type="text" className="form-control" placeholder={placeholder.area} required
                                ref={this.area} />
                        </div>

                        <div className='columns-add'>
                            <label>Employer</label>
                            <input type='text' className="form-control" placeholder={placeholder.employer} required
                                ref={this.employer} />

                            <label>Show Employer Name</label>
                            <select name='show_employer_name' className="form-control" defaultValue='Y' required
                                ref={this.show_employer_name}>
                                <option value='Y'>Yes</option>
                                <option value='N'>No</option>
                            </select>
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
                            <select name="currencylist" className="form-control" defaultValue='GBP' required
                                ref={this.currency}>
                                {_.map(currencyList, (item, index) => {
                                    return <option key={`currency-${index}`} value={item}>{item}</option>
                                })}
                            </select>
                            <input type="text" className="form-control" placeholder="35,000 - 45,000" required
                                ref={this.salary} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Organization Infomation</h2>
                            <textarea name="organization_info" className="form-control" rows='5' placeholder={placeholder.organization_info}
                                ref={this.organization_info} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Professional Field</h2>
                            <textarea name="professional_field" className="form-control" rows='5' placeholder={placeholder.professional_field}
                                ref={this.professional_field} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Job Description</h2>
                            <textarea name="job_description" className="form-control" rows='5' placeholder={placeholder.job_description}
                                ref={this.job_description} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Required Expertise</h2>
                            <textarea name="required_expertise" className="form-control" rows='5' placeholder={placeholder.required_expertise}
                                ref={this.required_expertise} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Responsibilities</h2>
                            <textarea name="responsibilities" id="projectID" className="form-control" rows='5' placeholder={placeholder.responsibility}
                                ref={this.responsibility} />
                        </div>

                        <div className='columns-add-merge'>
                            <h2>Essential skills</h2>
                            <textarea name="essential_skills" id="patentID" className="form-control" rows='5' placeholder={placeholder.essential_skills}
                                ref={this.essential_skills} />
                        </div>
                        <Button className='apply-btn' type="submit">Add Job</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}