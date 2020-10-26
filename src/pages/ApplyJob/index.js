import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchReq, getRole, getUid, setUserInfo } from '../../utils/utils';
import RegisterForm from '../../components/RegisterForm';
import LoginForm from '../../components/loginForm';
import Footer from '../../components/Footer';

import '../../styles/applyjob.css';

class ApplyJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: getRole(),
            projectId: props.match.params.projectId,
            expertId: (getRole() === 'expert' && getUid()) ? getUid() : null,
            project: {},
            showJoinus: false,
            statusForApply: 'register'
        }

        this.applyNow = this.applyNow.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
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
        } else if (role === '__admin__') {
            alert("You are admin and you are not supposed to apply for this job.")
        } else {
            this.setState({
                showJoinus: true
            }, () => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
        }
    }

    applyCallback(data) {
        setUserInfo(data);
        const expertId = (getRole() === 'expert' && getUid()) ? getUid() : null;

        this.setState({
            role: getRole(),
            expertId
        }, () => {
            const { projectId, statusForApply } = this.state;

            if (expertId) {
                fetchReq('/api/expertApply', {
                    body: JSON.stringify({
                        expertid: expertId,
                        projectid: projectId
                    })
                }).then(feedback => {
                    if (statusForApply === 'register') {
                        this.props.history.replace('/mgt');

                    } else if (statusForApply === 'login') {
                        alert(feedback)
                    }
                }).catch(msg =>
                    alert(msg)
                )
            } else {
                alert("only expert can apply")
            }
        })

    }

    render() {
        const { role, project, statusForApply } = this.state;
        const { job_title, employer, show_employer_name, start_date, close_date, currency, salary, job_description,
            required_expertise, professional_field, organization_info, responsibility, essential_skills } = project;

        return (
            <div>
                <section id="top" className="single-job-hero h-40">
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-light bg-transperent sticky-top px-3 text-dark">
                            <NavLink className="navbar-brand text-dark" to="/home"><h2>HI Talents</h2></NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarToggler">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/home">Home {/* <span className="sr-only">(current)</span> */}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/contactus">Contact Us</NavLink>
                                    </li>
                                    <li className="sign-in">
                                {role === '__admin__' ?
                                    <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                        <div className="text-light fa fa-user-o"></div>
                                    </NavLink>
                                    :
                                    (role === 'expert' ?
                                        <NavLink className="nav-item user" to="/mgt/expert_profile">
                                            <div className="text-light fa fa-user-o"></div>
                                        </NavLink>
                                        : <NavLink className="nav-item user" to="/login">
                                            <div className="text-light fa fa-user-o"></div>
                                        </NavLink>)
                                }
                            </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </section>

                <section >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 jobs-info">
                                <div className="job-title">
                                    <h1>{job_title}</h1>
                                </div>

                                <div className="job-details">
                                    <div className="salary">{currency} {salary}</div>
                                    <div className="status">{`Posted ${start_date} by ${show_employer_name === 'Y' ? employer : 'admin'}`}</div>
                                    {/* <div className="type">Featured</div> */}
                                </div>

                                <div className="job-summary">
                                    <p className="para-width">
                                        {organization_info}
                                    </p>
                                </div>

                                <div className="job-description">Job Description
                                    <p className="para-width">
                                        {job_description}
                                    </p>
                                </div>

                                <div className="job-responsibilities">Responsibilities
                                    <ul>
                                        <li className="info-item">
                                            {responsibility}
                                        </li>
                                        {/* <li className="info-item">
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
                                        </li> */}
                                    </ul>
                                </div>

                                <div className="job-skills">
                                    Essential Skills
                                    <ul>
                                        <li className="info-item">
                                            {essential_skills}
                                        </li>
                                        {/* <li className="info-item">
                                            Sales and relationship management experience
                                        </li>
                                        <li className="info-item">
                                            Experience working to commercial KPI’s
                                        </li> */}
                                    </ul>
                                </div>

                                <div className="apply-btn" onClick={this.applyNow}>Apply now</div>
                            </div>
                        </div>
                    </div>
                </section>

                { role ? null
                    :
                    <div className={this.state.showJoinus ? 'showContent content ' : 'content'} >
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
                                        <h4 className="form-header">Switch to Apply and <a className="switch-form" onClick={() => this.setState({ statusForApply: statusForApply === 'login' ? 'register' : 'login' })}>{statusForApply === 'login' ? 'Register' : 'Login'}</a> </h4>
                                        {
                                            statusForApply === 'register' ?
                                                <RegisterForm
                                                    registerCallback={this.applyCallback}
                                                    confirmButtonText="Apply & Register"
                                                />
                                                : <LoginForm
                                                    loginCallback={this.applyCallback}
                                                    confirmButtonText="Apply & Login"
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }

                <Footer />
            </div>
        )
    }
}

export default withRouter(ApplyJob)