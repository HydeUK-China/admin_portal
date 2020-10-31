import React, { Component } from 'react';
import InfoEditModal from '../components/infoEditModal';
import { fetchReq } from '../utils/utils';

export default class JobCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: props.data,
            showInfo: false
        }

        this.cancalApplication = this.cancalApplication.bind(this);
    }

    showMore = () => {
        this.setState({
            showInfo: true
        })
    }

    closeInfoHandler = (hide) => {
        this.setState({
            showInfo: hide
        })
    }

    handleDataChange = (data) => {
        this.setState({
            data
        })
    }

    calculateDayDiff(startDate) {
        const today = new Date();
        const date_to_reply = new Date(startDate);
        const timeinmilisec = today.getTime() - date_to_reply.getTime();
        return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))
    }

    cancalApplication() {
        const { data } = this.state;
        const { cancalApplicationHandler } = this.props;
        cancalApplicationHandler(data.expert_id, data.project_id);
    }

    render() {
        const { moreField, moreHeader, role, cancalApplication } = this.props;
        const { data, showInfo } = this.state;
        const { job_title, employer, start_date, close_date, application_complete, currency, salary, job_type, show_employer_name } = data;

        return (
            <div className="col-m-6 col-sm-6">
                <div className="job-card">
                    {application_complete === 'N' ? <span className="warning-text">Incomplete application</span> : null}
                    <div className="job-card-header">
                        <ul className="header-list">
                            <li className="header-item">
                                <h3>{job_title}</h3>
                            </li>
                            {/* <li className="posted">Posted By</li>
                            <li className="company">{show_employer_name === 'Y' ? employer : 'admin'}</li> */}
                        </ul>
                        <div className="job-card-sec-1">
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li className="posted">Salary</li>
                                    <li className="date">{currency} {salary}</li>
                                </ul>
                            </div>
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li className="posted">Job Type</li>
                                    <li className="date">{job_type}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="job-card-sec-1">
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li className="posted">Start Date</li>
                                    <li className="date">{start_date} </li>
                                </ul>
                            </div>
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li className="posted">Close Date</li>
                                    <li className="date">{close_date}</li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                        <div className="job-card-sec-1">
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <button className="see-more" onClick={this.showMore}>See More</button>
                                </ul>
                            </div>
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <button className="see-more" onClick={this.cancalApplication}>Cancel Application</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <InfoEditModal
                    show={showInfo}
                    close={this.closeInfoHandler}
                    allowEdit={role === '__admin__' ? true : false}
                    onDataChange={role === '__admin__' ? this.handleDataChange : null}
                    modalHeader='Project Info'
                    headers={moreHeader}
                    fileds={moreField}
                    data={data}
                />
            </div>
        )
    }
}