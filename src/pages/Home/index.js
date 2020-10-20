import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchReq, getRole } from '../../utils/utils';
import Footer from '../../components/Footer';
import JobTitleCard from '../../components/jobTitleCard';
import searchImg from '../../img/search.svg';
import opportunityImg from '../../img/opportunities.svg';
import workshopImg from '../../img/workshop.svg';
import solutionImg from '../../img/solution.svg';
import teamImg from '../../img/team.svg';
import urbanPlanningImg from '../../img/urban planning.svg';
import medicalScienceImg from '../../img/medical science.svg';
import envinromentalSienceImg from '../../img/Envinromental science.svg';
import materialScienceImg from '../../img/material science.svg';
import renewableEnergyImg from '../../img/renewable energy.svg';
import marineEngineerImg from '../../img/marine engineer.svg';
import chemistryImg from '../../img/chemistry.svg';
import engineeringManufacturingImg from '../../img/engineering and manufacturing.svg';
import informationTechnologyImg from '../../img/information technology.svg';
import dataScienceImg from '../../img/data science.svg';
import businessManagementImg from '../../img/business management.svg';
import aiImg from '../../img/ai.svg';
import '../../styles/home.css';
import TopNav from '../../components/TopNav';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: getRole(),
            projectData: []
        }

    }

    componentDidMount() {
        this.receiveUpdateData();
    }

    receiveUpdateData() {
        fetchReq('/api/fetchProject/all').then(data => {
            this.setState({
                projectData: _.slice(data, 0, 9)
            })
        }).catch(err => alert(err));
    }

    getProjectList() {
        const { projectData } = this.state;

        return _.map(projectData, (value, index) => {
            return <JobTitleCard key={`jobtitlecard-${index}`}
                data={value}
                link={`/applyjob/${value.project_id}`} />
        })
    }

    render() {
        const { role } = this.state;

        return (
            <div>
                <TopNav></TopNav>
                <section id="top">
                    <div className="hero-content">
                    <div className=" jumbotron">
                        <div className="container">
                            <h1>Unlock Potential </h1>
                            <h5>with the Free Flow of Knowledge Sharing</h5>
        
                        <div className="row callToAction">
                            <div className="col-md-3">
                                <Link to="/aboutus">Our Services <i className="fa fa-arrow-right"></i></Link>
                            </div>

                            <div className="col-md-4">
                            <Link to="/jobs">Featured jobs <i className="fa fa-arrow-right"></i></Link>
                            </div>

                                
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </section>

            {/* Our Services */}

                <section id="services">
                    <div className="container-fluid text-center justify-content-center align-content-center mx-auto">
                        <header className="section-header">
                        <h1>  OUR SERVICES </h1>
                        </header> 
                        <div className="row ">
                            <div className="col-sm-4 ">
                                <div className="card pt-2">
                                    <img className="card-img-top" src={searchImg} width="100%" height="60px" />
                                    <h3>
                                        <hr />
                                            Unique Training and
                                            Consulting Possibilities
                                </h3>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card pt-2">
                                    <img src={opportunityImg} width="100%" height="60px" />
                                    <h3>
                                        <hr />
                                        Flexible Job
                                        Opportunities
                                        in Technology
                            </h3>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card pt-2">
                                    <img src={workshopImg} width="100%" height="60px" />
                                    <h3>
                                        <hr />
                                        Unique Training and
                                        Consulting Possibilities
                            </h3>
                                </div>

                            </div>

                        </div>
                        <div className="row mt-3 ">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-4" >
                                <div className="card pt-2" >
                                    <img src={solutionImg} width="100%" height="60px" />
                                    <h3>
                                        <hr />
                                        Bespoke Incubator
                                        Schemes
                                        for Potential Ideas
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-4 ">
                                <div className="card pt-2">
                                    <img src={teamImg} width="100%" height="60px" />
                                    <h3>
                                        <hr />
                                        Exclusive Networking
                                        with
                                        Knowledgeable Professionals
                            </h3>
                                </div>
                            </div>
                            <div className="col-sm-2"></div>
                        </div>
                    </div>
                </section>

                {/*Featured Jobs  */}

                <section id="featured">
                    <div className="container-fluid ">
                    <header className="section-header">
                        <h1>  Featured jobs </h1>
                        </header> 
                    

                        <div className="featured-jobs_grid">
                            {this.getProjectList()}
                        </div>
                        <div className="mt-3">
                        <span className="explore-square"></span>
                            <Link className="explore-link" to="/jobs"> VIEW MORE <i className="fa fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </section>



              {/* About Us */}

                <section id="home-about">
                <div className="Container about-sec">
                    <div className="info">
                    <header className="section-header">
                        <h1>  why us </h1>
                        </header> 
                    
                        <p className="para_info">
                            Hyde International Talent (HIT) Network provides an interactive and innovative platform for global talented
                            individuals and organisations in scientific and technological fields to exchange knowledge, incubate their
                            research ideas and source collaborative opportunities. </p>
                        <p className="para">What you can expect：</p>

                        <p className="para">
                            ● Access to a wide range of technology-focused jobs.
                        </p>
                        <p className="para">
                            ● Connect directly to providers of global research funding. 
                        </p>
                        <p className="para">
                            ● Join and interact in our high-tech community with thousands of talented individuals worldwide. 
                        </p>
                        <p className="para">
                            ● Share your ideas and expertise through international training and consulting opportunities for industry
                            leaders.
                        </p>
                        <p className="para">
                            ● Participate in world-leading scientific projects. 
                        </p>
                    </div>
                    </div>
                </section>
                <section id="industry">
                    <div className="container">
                    <header className="section-header">
                        <h1> Main Industry </h1>
                        </header> 

                        {/* <article className="industry-grid">
                            <div className="card">
                                <div className="industry-background"><img src={urbanPlanningImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Urban Planning</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={medicalScienceImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Medical Science</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={envinromentalSienceImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Environmental Science</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={materialScienceImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Materials Science</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={renewableEnergyImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Renewable Energy</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={marineEngineerImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Marine Engineering</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={chemistryImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Chemistry</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={engineeringManufacturingImg} width="100%" height="120px" />
                                </div>
                                <label className="industry-label">Engineering & Manufacturing</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={informationTechnologyImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Information Technology</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={dataScienceImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Data Science & Social Data Science</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={businessManagementImg} width="100%" height="120px" /></div>
                                <label className="industry-label">Business & Management</label>
                            </div>
                            <div className="card">
                                <div className="industry-background"><img src={aiImg} width="100%" height="120px" /></div>
                                <label className="industry-label">AI & Robotics</label>
                            </div>
                        </article> */}
                        
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}