import React, { Component } from 'react';

import '../styles/footer.css';

export default class Footer extends Component {
  
    render() {
        return (
            <div>
                <div className="footer">
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
                                    <div className="fa fa-phone"></div>+44 (0) 207 038 7865<div
                                        className="fa fa-envelope" style={{'marginLeft': '8px'}}></div>uk@hyde-china.com
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
                            <i><a href="#"><span className="faq">faq</span></a></i>

                            <i><a href="privacy.html"><span className="privacy">privacy</span></a></i>

                            <i><a href="terms.html"><span className="terms">terms</span></a></i>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>All rights reserved &copy;. Powered by the <i>Hyde International Talents (HIT)</i></p>
                </div>
            </div>
        )
    }
}
