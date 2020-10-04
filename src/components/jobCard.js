import React, { Component } from 'react';
import InfoEditModal from '../components/infoEditModal';

export default class JobCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: props.data,
            showInfo: false
        }
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

    calculateDayDiff(startDate){
        const today = new Date();
        const date_to_reply = new Date(startDate);
        const timeinmilisec = today.getTime() - date_to_reply.getTime();
        return Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))
    }

    render() {
        const { moreField, moreHeader, role } = this.props;
        const { data, showInfo } = this.state;
        const { job_title, employer, start_date, close_date, salary } = data;

        return (
            <div className="col-m-6 col-sm-6">
                <div className="job-card ">
                    <div className="job-card-header">
                        <ul className="header-list">
                            <li className="header-item">
                            <h3>{job_title}</h3>
                            </li>
                            <li className="posted">Posted By</li>
                            <li className="company">{employer}</li>
                        </ul>
                        <div className="job-card-sec-1">
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li className="posted">Close Date</li>
                                    <li className="company">{close_date}</li>
                                </ul>
                            </div>
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li className="posted">Posted</li>
                                    <li className="company">{ start_date !== "" ? `${this.calculateDayDiff(start_date)} days ago` : ''} </li>
                                </ul>
                            </div>

                        </div>
                        <hr />
                        <div className="job-card-sec-1">
                            <div className=".col-6 col-m-12 .col-sm-12">
                                <ul>
                                    <li> <button className="see-more" onClick={this.showMore}>See More</button></li>
                                </ul>
                            </div>
                            <div className=".col-6 col-m-12 .col-sm-12">
                                {/* <ul>
                                    <li className="salary">{`£${salary}`}</li>
                                </ul> */}
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