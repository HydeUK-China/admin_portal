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
                projectData: _.slice(data, 0, 6)
            })
        }).catch(err => alert(err));
    }

    getProjectList(){
        const { projectData } = this.state;

        return _.map(projectData, (value, index) => {
            return <JobTitleCard key={`jobtitlecard-${index}`}
                        data={value} 
                        link={`/applyjob/${value.project_id}`}/>
        })
    }

    render() {
        const { role } = this.state;

        return (
            <div>
                <section id="top" className="home-hero">
                    <header id="header">
                        <div className="brand-container">
                            <Link className="brand" to="/home">
                                Hyde International Talents       
                            </Link>
                        </div>

                        <nav className="main-nav">
                            <NavLink className="nav-item" to="/home">Home</NavLink>
                            <NavLink className="nav-item" to="/jobs">Jobs</NavLink>
                            <NavLink className="nav-item" to="/aboutus">About</NavLink>
                            <NavLink className="nav-item" to="/contactus">Contact</NavLink>
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


                    <div className="hero-content">
                        <div className="hero-content_title">
                            <h2>Unlock Potential </h2>
                            <h5>with the Free Flow of Knowledge Sharing</h5>
                        </div>
                        <div className="callToAction">
                            <span className="square"></span>
                            <a href="#">Our Services <i className="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </section>
 
                <section id="services">
                     <div className="container">
                         <div className="allInfo-services">
                            <h1 className="header-services">  Our Services </h1>
                            <div className="types-services">
                                <div className="service">
                                    <h3 className="type-service_header">

                                        <div className="icon">
                                            <img src={searchImg} width="100%" height="90px" />
                                        </div>
                                        <hr/>
                                        Global Research and
                                        Development
                                        Collaboration
                                    </h3>
                                </div>
                            
                                <div className="service">
                                    <h3 className="type-service_header">
                                        <div className="icon">
                                            <img src={opportunityImg} width="100%" height="90px"/>
                                        </div>
                                        <hr/>
                                        Flexible Job
                                        Opportunities
                                        in Technology
                                    </h3>
                                </div>
          
                                <div className="service">
                                    <h3 className="type-service_header">
                                        <div className="icon">
                                            <img src={workshopImg} width="100%" height="90px"/>
                                        </div>
                                        <hr/>
                                        Unique Training and
                                        Consulting Possibilities
                                    </h3>
                                </div>

                                <div className="service">
                                    <h3 className="type-service_header">
                                    <div className="icon">
                                        <img src={solutionImg} width="100%" height="90px" />
                                    </div>
                                    <hr/>
                                    Bespoke Incubator
                                    Schemes
                                    for Potential Ideas
                                    </h3>
                                </div>

                                <div className="service">
                                    <h3 className="type-service_header">
                                        <div className="icon">
                                            <img src={teamImg} width="100%" height="90px" />
                                        </div>
                                        <hr/>
                                        Exclusive Networking
                                        with
                                        Knowledgeable Professionals
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
 
                <section id="featured">
                    <div className="container">
                        <div className="header-featured">
                            <h1>featured jobs</h1>
                            <span className="explore-square"></span>
                            <Link className="explore-link" to="/jobs">Explore more<i className="fa fa-arrow-right"></i></Link>
                        </div>

                        <article className="featured-jobs_grid">
                            {this.getProjectList()}
                        </article>
                    </div>
                </section>
  
  

                <section id="home-about">
                    <div className="about-image">
                    
                    </div>
                    <div className="info">
                        <div className="title_info">
                            <center>Why Us</center>
                        </div>
                        <br/>
                        <p className="para_info">
                            Hyde International Talent (HIT) Network provides an interactive and innovative platform for global talented
                            individuals and organisations in scientific and technological fields to exchange knowledge, incubate their
                            research ideas and source collaborative opportunities. </p>
                        <p className="para">What you can expect：</p>
    
                        <p className="para">
                            <i>● Access to a wide range of technology-focused jobs.</i>
                        </p>
                        <p className="para">
                            <i>● Connect directly to providers of global research funding. </i>
                        </p>
                        <p className="para">
                            <i>● Join and interact in our high-tech community with thousands of talented individuals worldwide. </i>
                        </p>
                        <p className="para">
                            <i>● Share your ideas and expertise through international training and consulting opportunities for industry
                            leaders.</i>
                        </p>
                        <p className="para">
                            <i>● Participate in world-leading scientific projects. </i>
                        </p>          
                    </div>
                </section>
                 <section id ="industry">
                <div className="container">
                    <div className="industry-header">
                        <h1>Main Industry</h1>
                    </div>

                    <article className="industry-grid">
                        <div className="industry-container">
                            <div className="industry-background"><img src={urbanPlanningImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Urban Planning</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={medicalScienceImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Medical Science</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={envinromentalSienceImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Environmental Science</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={materialScienceImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Materials Science</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={renewableEnergyImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Renewable Energy</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={marineEngineerImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Marine Engineering</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={chemistryImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Chemistry</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={engineeringManufacturingImg} width="100%" height="120px"/>
                            </div>
                            <label className="industry-label">Engineering & Manufacturing</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={informationTechnologyImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Information Technology</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={dataScienceImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Data Science & Social Data Science</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={businessManagementImg} width="100%" height="120px"/></div>
                            <label className="industry-label">Business & Management</label>
                        </div>
                        <div className="industry-container">
                            <div className="industry-background"><img src={aiImg} width="100%" height="120px"/></div>
                            <label className="industry-label">AI & Robotics</label>
                        </div>
                    </article>
                </div>
            </section>
                <Footer/>
            </div>
        )
    }
}