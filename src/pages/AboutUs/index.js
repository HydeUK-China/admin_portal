import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole } from '../../utils/utils';
import Footer from '../../components/Footer';
import '../../styles/aboutus.css';
import TopNav from '../../components/TopNav'
import womenimg from "../../img/photography-of-woman.jpg"

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
        <TopNav></TopNav>



        <div className="container-fluid px-0">
          <div className="row mx-0 mb-2 bg-theme">
            <div className="col-md-4 px-0 pt-0  text-center overflow-hidden">
              <img className="image" src={womenimg} width="100%" height="100%" />
            </div>
            <div className="col-md-8 px-0 pt-0 text-left text-white overflow-hidden">


              <div class="w-100">
                <div class="bg-theme pt-3 px-3 pt-md-5 px-md-5 overflow-hidden">
                  <div class="my-3 py-3">
                    <h2 class="display-5 text-center">HYDE INTERNATIONAL TALENTS</h2>

                  </div>
                  <div class="bg-light shadow-sm mx-auto py-2 py-md-5" style={{ width: "100%", height: "500px" }} >
                    <div className=" px-2 py-2  shadow-sm mx-3 ">
                      <header className="section-header">
                        <h1>  Our Story </h1>
                      </header>

                      <h5 className="text-dark para">
                        With years of experience in technology-intensive fields, HIT understands the struggles that every researcher
                        and professional faces when looking for collaborative opportunities and research-related support for their
                        projects. HIT aims to unite highly talented researchers, investors and professionals in scientific and
                        technological fields with the best possible opportunities and solutions sourced from numerous
                        industry-leading organisations and research partners all around the world . HIT believes in the power of
                        connections and is dedicated to expanding and maintaining its network of members through providing them with
                        customised solutions. HIT strives to help facilitate its members’ goals and aspirations.
                                  </h5>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>



          <section id="faq" className="faq-section">
            <div className="container-fluid-faq-content-box">
              <div className="row mx-5">
                <div className="col-8">
                  
                  <header className="section-header">
                  <Link to="/contactus"><h5 className="faq-sub-title">Still have questions?</h5></Link>
                    <h1 className="text-left">FREQUENTLY ASKED QUESTIONS.</h1>
                  </header>
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

          <Footer />
        </div>
      </div>
    );
  }
}
