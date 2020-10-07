import React, { Component } from 'react';
import Footer from '../../components/Footer';
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

        }

    }

    render() {
        return (
            <div>
                <section id="top" class="home-hero">
                    <header id="header">
                        <div class="brand-container">
                            <a class="brand" href="/">
                            Hyde International Talents
                        
                            </a>
                        </div>

                        <nav class="main-nav">
                            <a class="nav-item" href="/">Home</a>
                            <a class="nav-item" href="/jobPages/category-page.html">Jobs</a>
                            <a class="nav-item" href="/about-page.html">About</a>
                            <a class="nav-item" href="/contact-page.html">Contact</a>
                            <div class="sign-in">
                            <a class="nav-item user" href="accounts/login.html">
                                <div class="fa fa-user-o"></div>
                            </a>
                            </div>
                        </nav>
        
                     </header>


                    <div class="hero-content">
                        <div class="hero-content_title">
                            <h2>Unlock Potential </h2>
                            <h5>with the Free Flow of Knowledge Sharing</h5>
                        </div>
                        <div class="callToAction">
                            <span class="square"></span>
                            <a href="#">Our Services<span class="ti-arrow-right"></span></a>
                        </div>
                    </div>
                </section>
 
                <section id="services">
                     <div class="container">
                         <div class="allInfo-services">
                            <h1 class="header-services">  Our Services </h1>
                            <div class="types-services">
                                <div class="service">
                                    <h3 class="type-service_header">

                                        <div class="icon">
                                            <img src={searchImg} width="100%" height="90px" />
                                        </div>
                                        <hr/>
                                        Global Research and
                                        Development
                                        Collaboration
                                    </h3>
                                </div>
                            
                                <div class="service">
                                    <h3 class="type-service_header">
                                        <div class="icon">
                                            <img src={opportunityImg} width="100%" height="90px"/>
                                        </div>
                                        <hr/>
                                        Flexible Job
                                        Opportunities
                                        in Technology
                                    </h3>
                                </div>
          
                                <div class="service">
                                    <h3 class="type-service_header">
                                        <div class="icon">
                                            <img src={workshopImg} width="100%" height="90px"/>
                                        </div>
                                        <hr/>
                                        Unique Training and
                                        Consulting Possibilities
                                    </h3>
                                </div>

                                <div class="service">
                                    <h3 class="type-service_header">
                                    <div class="icon">
                                        <img src={solutionImg} width="100%" height="90px" />
                                    </div>
                                    <hr/>
                                    Bespoke Incubator
                                    Schemes
                                    for Potential Ideas
                                    </h3>
                                </div>

                                <div class="service">
                                    <h3 class="type-service_header">
                                        <div class="icon">
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
                    <div class="container">
                        <div class="header-featured">
                            <h1>featured jobs</h1>
                            <span class="explore-square"></span>
                            <a class="explore-link" href="#">Explore more<span class="explore-arrow ti-arrow-right"></span></a>
                        </div>

                        <article class="featured-jobs_grid">
                            <a href="/jobPages/single-job.html" class="job-card">
                            <span class="ti-bag"></span>
                            <div class="jobCard-info">
                                <div class="job-title">Account Manager</div>
                                <div class="job-salary">£35,000 - £45,000</div>
                                <div class="job-status">Posted 6 days</div>
                            </div>
                            </a>
                            <a href="jobPages/single-job.html" class="job-card">
                            <span class="ti-bag"></span>
                            <div class="jobCard-info">
                                <div class="job-title">Account Manager</div>
                                <div class="job-salary">£35,000 - £45,000</div>
                                <div class="job-status">Posted 6 days</div>
                            </div>
                            </a>
                            <a href="jobPages/single-job.html" class="job-card">
                            <span class="ti-bag"></span>
                            <div class="jobCard-info">
                                <div class="job-title">Account Manager</div>
                                <div class="job-salary">£35,000 - £45,000</div>
                                <div class="job-status">Posted 6 days</div>
                            </div>
                            </a>
                            <a href="jobPages/single-job.html" class="job-card">
                            <span class="ti-bag"></span>
                            <div class="jobCard-info">
                                <div class="job-title">Account Manager</div>
                                <div class="job-salary">£35,000 - £45,000</div>
                                <div class="job-status">Posted 6 days</div>
                            </div>
                            </a>
                            <a href="jobPages/single-job.html" class="job-card">
                            <span class="ti-bag"></span>
                            <div class="jobCard-info">
                                <div class="job-title">Account Manager</div>
                                <div class="job-salary">£35,000 - £45,000</div>
                                <div class="job-status">Posted 6 days</div>
                            </div>
                            </a>
                            <a href="jobPages/single-job.html" class="job-card">
                            <span class="ti-bag"></span>
                            <div class="jobCard-info">
                                <div class="job-title">Account Manager</div>
                                <div class="job-salary">£35,000 - £45,000</div>
                                <div class="job-status">Posted 6 days</div>
                            </div>
                            </a>
                        </article>
                    </div>
                </section>
  
  

                <section id="home-about">
                    <div class="about-image">
                    
                    </div>
                    <div class="info">
                        <div class="title_info">
                            <center>Why Us</center>
                        </div>
                        <br/>
                        <p class="para_info">
                            Hyde International Talent (HIT) Network provides an interactive and innovative platform for global talented
                            individuals and organisations in scientific and technological fields to exchange knowledge, incubate their
                            research ideas and source collaborative opportunities. </p>
                        <p class="para">What you can expect：</p>
    
                        <p class="para">
                            <i>● Access to a wide range of technology-focused jobs.</i>
                        </p>
                        <p class="para">
                            <i>● Connect directly to providers of global research funding. </i>
                        </p>
                        <p class="para">
                            <i>● Join and interact in our high-tech community with thousands of talented individuals worldwide. </i>
                        </p>
                        <p class="para">
                            <i>● Share your ideas and expertise through international training and consulting opportunities for industry
                            leaders.</i>
                        </p>
                        <p class="para">
                            <i>● Participate in world-leading scientific projects. </i>
                        </p>          
                    </div>
                </section>
 
                <div class="container">
                    <div class="industry-header">
                        <h1>Main Industry</h1>
                    </div>

                    <article class="industry-grid">
                        <div class="industry-container">
                            <div class="industry-background"><img src={urbanPlanningImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Urban Planning</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={medicalScienceImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Medical Science</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={envinromentalSienceImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Environmental Science</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={materialScienceImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Materials Science</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={renewableEnergyImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Renewable Energy</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={marineEngineerImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Marine Engineering</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={chemistryImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Chemistry</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={engineeringManufacturingImg} width="100%" height="120px"/>
                            </div>
                            <label class="industry-label">Engineering & Manufacturing</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={informationTechnologyImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Information Technology</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={dataScienceImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Data Science & Social Data Science</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={businessManagementImg} width="100%" height="120px"/></div>
                            <label class="industry-label">Business & Management</label>
                        </div>
                        <div class="industry-container">
                            <div class="industry-background"><img src={aiImg} width="100%" height="120px"/></div>
                            <label class="industry-label">AI & Robotics</label>
                        </div>
                    </article>
                </div>

                <Footer/>
            </div>
        )
    }
}