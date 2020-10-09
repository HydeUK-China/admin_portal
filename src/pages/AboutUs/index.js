import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole } from '../../utils/utils';

import Footer from '../../components/Footer';

import '../../styles/main.css';

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
    <header id="header">
                        <div className="brand-container">
                            <a className="brand" href="/">
                            Hyde International Talents
                        
                            </a>
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
    <section>  
      <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6">
        </div>
        <div class="col-sm-12 col-md-6 main-container">
          <span class="about-title_shape">
          </span>
          <div class="about-information">
            <h2>Hyde International Talents</h2>
          </div>
        </div>
        <div class="story-about-us">
          <div class="our-story-title">
            Our Story
          </div>
          <p class="our-story-para">
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
    <span class="contactAbout-shape"></span>
  </section>

  <section id="faq" class="faq-section">
    <div class="container-fluid-faq-content-box">
      <div class="row">
        <div class="col-6">
          <h5 class="faq-sub-title">Still have questions?</h5>
          <h1 class="faq-main-title">FREQUENTLY ASKED QUESTIONS.</h1>
        </div>
        <div class="accordian">
          <div id="first-question" class="accordian-item">
            <a class="accordian-link" href="#first-question">Do I need to be concerned with my Intellectual property
              right and the confidentiality of the information regarding my research project?
              <i class="add-circle-outline">
                <ion-icon name="add-circle-outline"></ion-icon>
              </i>
              <i class="close-outline">
                <ion-icon name="close-outline"></ion-icon>
              </i>
            </a>
            <div class="answer">
              <p>
                The candidate will have the autonomy to determine how much information about his/her project/idea s/he
                is willing to share in the whole process. Hyde will not ask for any sensitive information. More
                importantly, both Hyde and the candidate's future partner/investor will guarantee the intellectual
                property (IP) of the candidate through further legal documents.
              </p>
            </div>
          </div>

          <div id="second-question" class="accordian-item">
            <a class="accordian-link" href="#second-question">How much do I get to say in the selection of collaboration
              opportunities?
              <i class="add-circle-outline">
                <ion-icon name="add-circle-outline"></ion-icon>
              </i>
              <i class="close-outline">
                <ion-icon name="close-outline"></ion-icon>
              </i>
            </a>
            <div class="answer">
              <p>
                The candidate will be able to directly participate in the entire negotiation process with the potential
                partners/investors and decide which offer(s) to accept. The candidate will have the full power in
                determining which of his/her project/idea will be cooperated with his/her future partners/investor and
                how。
              </p>
            </div>
          </div>

          <div id="third-question" class="accordian-item">
            <a class="accordian-link" href="#third-question">Would get any help with the work visa application?
              <i class="add-circle-outline">
                <ion-icon name="add-circle-outline"></ion-icon>
              </i>
              <i class="close-outline">
                <ion-icon name="close-outline"></ion-icon>
              </i>
            </a>
            <div class="answer">
              <p>
                Visa sponsorship is guaranteed. Additionally, Hyde will offer relevant information and advice regarding
                the visa application and will provide a certain level of support to the candidates.
              </p>
            </div>
          </div>

          <div id="fourth-question" class="accordian-item">
            <a class="accordian-link" href="#fourth-question"> Do I have to be physically working abroad?
              <i class="add-circle-outline">
                <ion-icon name="add-circle-outline"></ion-icon>
              </i>
              <i class="close-outline">
                <ion-icon name="close-outline"></ion-icon>
              </i>
            </a>
            <div class="answer">
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