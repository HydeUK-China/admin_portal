import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole } from '../../utils/utils';
import Footer from '../../components/Footer';

import '../../styles/aboutus.css';

export default class AboutUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
          role: getRole()
        }

    }

    render() {
      const { role } = this.state;  
        return (
                  <div>
                    <section id="top" className="about-header ">
                      <div className="side-image ">
                      </div>
                      <header id="header">
                        <div className="brand-container">
                            <Link className="brand" to="/home">
                            HI Talents       
                            </Link>
                        </div>

                        <nav className="main-nav">
                            <NavLink className="nav-item" to="/home" style={{color: 'black'}}>Home</NavLink>
                            <NavLink className="nav-item" to="/jobs" style={{color: 'black'}}>Jobs</NavLink>
                            <NavLink className="nav-item" to="/aboutus" style={{color: 'black'}}>About</NavLink>
                            <NavLink className="nav-item" to="/contactus" style={{color: 'black'}}>Contact</NavLink>
                            <div className="sign-in">
                            {role === '__admin__' ?
                                <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                    <div className="fa fa-user-o" style={{color: 'black'}}></div>
                                </NavLink>
                                : 
                                (role === 'expert' ? 
                                    <NavLink className="nav-item user" to="/mgt/expert_profile">
                                        <div className="fa fa-user-o" style={{color: 'black'}}></div>
                                    </NavLink>
                                    : <NavLink className="nav-item user" to="/login">
                                        <div className="fa fa-user-o" style={{color: 'black'}}></div>
                                      </NavLink>)
                            }                          
                            </div>
                        </nav>
        
                      </header>

                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                          </div>
                          <div className="col-sm-12 col-md-6 main-container">
                            <span className="about-title_shape">
                            </span>
                            <div className="about-information">
                              <h2>Hyde International Talents</h2>
                            </div>
                          </div>
                          <div className="story-about-us">
                            <div className="our-story-title">
                              Our Story
                            </div>
                            <p className="our-story-para">
                              With years of experience in technology-intensive fields, HIT understands the struggles that every researcher
                              and professional faces when looking for collaborative opportunities and research-related support for their
                              projects. HIT aims to unite highly talented researchers, investors and professionals in scientific and
                              technological fields with the best possible opportunities and solutions sourced from numerous
                              industry-leading organisations and research partners all around the world . HIT believes in the power of
                              connections and is dedicated to expanding and maintaining its network of members through providing them with
                              customised solutions. HIT strives to help facilitate its members’ goals and aspirations.</p>
                          </div>
                        </div>
                      </div>
                      <span className="contactAbout-shape"></span>
                    </section>

                    <section id="faq" className="faq-section">
                      <div className="container-fluid-faq-content-box">
                        <div className="row">
                          <div className="col-6">
                            <h5 className="faq-sub-title">Still have questions?</h5>
                            <h1 className="faq-main-title">FREQUENTLY ASKED QUESTIONS.</h1>
                          </div>
                          <div className="accordian">
                            <div id="first-question" className="accordian-item">
                              <a className="accordian-link" href="#first-question">Do I need to be concerned with my Intellectual property
                                right and the confidentiality of the information regarding my research project?
                                <i className="add-circle-outline">
                                  <ion-icon name="add-circle-outline"></ion-icon>
                                </i>
                                <i className="close-outline">
                                  <ion-icon name="close-outline"></ion-icon>
                                </i>
                              </a>
                              <div className="answer">
                                <p>
                                  The candidate will have the autonomy to determine how much information about his/her project/idea s/he
                                  is willing to share in the whole process. Hyde will not ask for any sensitive information. More
                                  importantly, both Hyde and the candidate's future partner/investor will guarantee the intellectual
                                  property (IP) of the candidate through further legal documents.
                                </p>
                              </div>
                            </div>

                            <div id="second-question" className="accordian-item">
                              <a className="accordian-link" href="#second-question">How much do I get to say in the selection of collaboration
                                opportunities?
                                <i className="add-circle-outline">
                                  <ion-icon name="add-circle-outline"></ion-icon>
                                </i>
                                <i className="close-outline">
                                  <ion-icon name="close-outline"></ion-icon>
                                </i>
                              </a>
                              <div className="answer">
                                <p>
                                  The candidate will be able to directly participate in the entire negotiation process with the potential
                                  partners/investors and decide which offer(s) to accept. The candidate will have the full power in
                                  determining which of his/her project/idea will be cooperated with his/her future partners/investor and
                                  how。
                                </p>
                              </div>
                            </div>

                            <div id="third-question" className="accordian-item">
                              <a className="accordian-link" href="#third-question">Would get any help with the work visa application?
                                <i className="add-circle-outline">
                                  <ion-icon name="add-circle-outline"></ion-icon>
                                </i>
                                <i className="close-outline">
                                  <ion-icon name="close-outline"></ion-icon>
                                </i>
                              </a>
                              <div className="answer">
                                <p>
                                  Visa sponsorship is guaranteed. Additionally, Hyde will offer relevant information and advice regarding
                                  the visa application and will provide a certain level of support to the candidates.
                                </p>
                              </div>
                            </div>

                            <div id="fourth-question" className="accordian-item">
                              <a className="accordian-link" href="#fourth-question"> Do I have to be physically working abroad?
                                <i className="add-circle-outline">
                                  <ion-icon name="add-circle-outline"></ion-icon>
                                </i>
                                <i className="close-outline">
                                  <ion-icon name="close-outline"></ion-icon>
                                </i>
                              </a>
                              <div className="answer">
                                <p>
                                  The work location can be negotiated with future investors or partners. Not all of the research projects
                                  and work opportunities require the researchers to physically be in China. Therefore, candidates have the
                                  option to remain in their current positions and work remotely on a project/part-time basis.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <Footer/>
                  </div>
        )
    }
}