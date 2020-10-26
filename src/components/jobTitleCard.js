import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/jobtitlecard.css';

export default class JobTitleCard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    calculateDayDiff(startDate) {
        const today = new Date();
        const date_to_reply = new Date(startDate);
        const timeinmilisec = today.getTime() - date_to_reply.getTime();
        return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))
    }

    render() {
        const { data, link } = this.props;
        const { job_title, currency, salary, start_date, close_date, job_type } = data;

        return (
            <Link className="job-card" to={link}>

                <div className="job-card-header">
                    <ul className="header-list">
                        <li className="header-item">
                            <h5><i className="fa fa-suitcase"></i>&nbsp;{job_title}</h5>
                        </li>
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
                </div>

            </Link>
        )
    }
}
