import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchReq, getRole, getUid } from '../../utils/utils';

import '../../styles/applyjob.css';

class ApplyJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: getRole(),
            projectId: props.match.params.projectId,
            expertId: (getRole() === 'expert' && getUid()) ? getUid() : null,
            project: {}
        }

        this.applyNow = this.applyNow.bind(this);
    }

    componentDidMount() {
        const { projectId } = this.state;
        const url = `/api/fetchProject/${projectId}`;

        fetchReq(url).then(data => {
            this.setState({
                project: data
            })
        }).catch(err => alert(err));
    }

    applyNow() {
        const { projectId, expertId, role } = this.state;

        if (expertId) {
            fetchReq('/api/expertApply', {
                body: JSON.stringify({
                    expertid: expertId,
                    projectid: projectId
                })
            }).then(data => {
                alert(data)
            }).catch(msg =>
                alert(msg)
            )
        } if (role === '__admin__') {
            alert("You are admin and you are not supposed to apply for this job.")
        } else {
            alert("You are not loggedin yet. You need login before applying for this job.")
        }
    }

    render() {
        const { projectId, expertId, role, project } = this.state;
        const { job_title, employer, start_date, close_date, salary, job_description, required_expertise, professional_field } = project;
        console.log('projectId: ', projectId, 'expertId: ', expertId)

        return (
            <div>
                <section id="top" className="single-job-hero">
                    <header id="header">
                        <div className="brand-container">
                            <Link className="brand" to="/home">
                                Hyde International Talents
                            </Link>
                        </div>
                        <nav className="main-nav">
                            <NavLink className="nav-item" to="/home" style={{ color: 'white' }}>Home</NavLink>
                            <NavLink className="nav-item" to="/jobs" style={{ color: 'white' }}>Jobs</NavLink>
                            <NavLink className="nav-item" to="/aboutus" style={{ color: 'white' }}>About</NavLink>
                            <NavLink className="nav-item" to="/contactus" style={{ color: 'white' }}>Contact</NavLink>
                            <div className="sign-in">
                                {role === '__admin__' ?
                                    <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                        <div className="fa fa-user-o"></div>
                                    </NavLink>
                                    :
                                    (role === 'expert' ?
                                        <NavLink className="nav-item user" to="/mgt/expert_profile">
                                            <div className="fa fa-user-o"></div>
                                        </NavLink>
                                        : <NavLink className="nav-item user" to="/login">
                                            <div className="fa fa-user-o"></div>
                                        </NavLink>)
                                }
                            </div>
                        </nav>
                    </header>
                </section>

                <section className="job-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 jobs-info">
                                <div className="job-title">
                                    <h1>{job_title ? job_title : 'Ungiven Job Title'}</h1>
                                </div>

                                <div className="job-details">
                                    <div className="salary">{salary}</div>
                                    <div className="status">{ close_date !== "" ? `Posted ${close_date} by ${employer}` : ''}</div>
                                    <div className="type">Featured</div>
                                </div>

                                <div className="job-summary">
                                    <p className="para-width">
                                        {required_expertise}
                                    </p>
                                </div>

                                <div className="job-description">Job description
                                    <p className="para-width">
                                        {job_description}
                                    </p>
                                </div>

                                <div className="job-responsibilities">Responsibilities
                                    <ul>
                                        <li className="info-item">
                                            Onboarding and engagement process with every client.
                                    </li>
                                        <li className="info-item">
                                            Identify risks to minimise attrition.
                                    </li>
                                        <li className="info-item">
                                            Identify and convert opportunities to up sell and cross sell existing products.
                                    </li>
                                        <li className="info-item">
                                            Create and convert cross sell opportunities.
                                    </li>
                                        <li className="info-item">
                                            Establish and maintain relationship with key client stakeholders.
                                    </li>
                                    </ul>
                                </div>

                                <div className="job-skills">
                                    Essential skills
                                    <ul>
                                        <li className="info-item">
                                            Commercially and client focused
                                    </li>
                                        <li className="info-item">
                                            Sales and relationship management experience
                                    </li>
                                        <li className="info-item">
                                            Experience working to commercial KPI’s
                                    </li>
                                    </ul>
                                </div>

                                <div className="apply-btn" onClick={this.applyNow}>Apply now</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="applyTo-job">
                    <span className="joinUs-shape"></span>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="testimonialHeader">
                                    <h1><span style={{ color: 'white' }}>Jo</span>in <span style={{ display: 'block' }}><span
                                        style={{ color: 'white' }}>U</span>s.</span></h1>
                                </div>
                                <div className="clientTestimonial">
                                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                                    <h2 className="quote">
                                        "It opens up a whole world of opportunities, to meet new people,
                                        be close to work and in general, have a better quality of life".
                                    </h2>
                                    <p><b>Mary</b></p>
                                    <p>Researcher</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h4 className="form-header">Apply and register your CV now</h4>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(ApplyJob)