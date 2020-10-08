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
        const { employer, salary, start_date } = data;

        return (
            <Link className="job-card" to={link}>
                <i className="fa fa-suitcase"></i>
                <div className="jobCard-info">
                    <div className="job-title">{employer}</div>
                    <div className="job-salary">{salary}</div>
                    {
                        start_date ?
                            <div className="job-status">Posted {this.calculateDayDiff(start_date)} days</div>
                            : null
                    }
                </div>

            </Link>
        )
    }
}
