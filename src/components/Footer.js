import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../styles/footer.css';

export default class Footer extends Component {

    render() {
        return (
            <div>
                {/* <div className="footer">
                    <div className="socials">
                        <div className="title">follow us</div>
                        <div className="links">
                            <a href="#"><span className="ti-google"></span></a>
                            <a href="#"><span className="ti-facebook"></span></a>
                            <a href="#"><span className="ti-twitter-alt"></span></a>
                            <a href="#"><span className="ti-instagram"></span></a>
                        </div>
                    </div>
                    <div className="contact-us">
                        <div className="title">Contact us</div>
                        <div className="address">
                            <ul>
                                <li>
                                    <div className="fa fa-phone"></div> &nbsp; +44 (0) 207 038 7865<div
                                        className="fa fa-envelope" style={{'marginLeft': '8px'}}></div>&nbsp; contact@hyde-china.com
                                </li>
                                <li>
                                    International (UK) 37th Floor, One Canada Square
                                    Canary Wharf, London, United Kingdom, E14 5AA
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="support">
                        <div className="title">support</div>
                        <div className="help">
                            <NavLink to=""><i><span className="faq">faq</span></i></NavLink>

                            <NavLink to="../privacy.html"> <i><span className="privacy">privacy</span></i></NavLink>

                            <NavLink to="../terms.html"> <i><span className="terms">terms</span></i></NavLink>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    All rights reserved &copy;. Powered by the <i>Hyde International Talents (HIT)</i>
                </div> */}
                <footer>
                    <div className="container">
                        <div className="row">

                            <div className=" col-sm-3 ">
                                <h4>Follow Us</h4>
                                <a href="https://www.linkedin.com/company/hyde-international-uk/?originalSubdomain=uk" className="social"><i className="fa fa-linkedin"></i></a>
                            </div>
                            <div className=" col-sm-6">
                                <h4>Contact Us</h4>
                                <h6>HI Talents (UK)</h6>
                                <p>
                                    37th Floor, One Canada Square,
                                    Canary Wharf, London,
                                     United Kingdom, E14 5AA <br/>
                                    <strong><i className="fa fa-phone"></i></strong>&nbsp;+44 (0) 207 038 7865<br />
                                    <strong><i className="fa fa-envelope"></i></strong> &nbsp;contact@hyde-china.com<br />
                                </p>
                            </div>
                            <div className="col-sm-3">
                                <h4>Help</h4>
                                <ul>
                                    <li><i className="fa fa-angle-right"></i> <Link to="/cookies-policy">Cookies policy</Link></li>
                                    <li><i className="fa fa-angle-right"></i> <Link to="/terms-of-service">Terms of service</Link></li>
                                    <li><i className="fa fa-angle-right"></i> <Link to="/privacy-policy">Privacy policy</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div class="container">
                            <div class=" text-center">
                                &copy; Copyright <strong>HYDE INTERNATIONAL (UK)</strong>. All Rights Reserved
                            </div>
                        </div>
                    </div>

                </footer>

















            </div>
        )
    }
}
