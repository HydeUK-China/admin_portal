import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/footer.css';

export default class Footer extends Component {

    render() {
        return (
            <div>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <h4>Contact Us</h4>
                                <h6>HYDE INTERNATIONAL TALENTS (UK)</h6>
                                <p>
                                    37th Floor, One Canada Square,
                                    Canary Wharf, London,
                                     United Kingdom, E14 5AA <br/>
                                    <strong><i className="fa fa-phone"></i></strong>&nbsp;+44 (0) 207 038 7865<br />
                                    <strong><i className="fa fa-envelope"></i></strong> &nbsp;contact@hyde-china.com<br />
                                </p>
                            </div>
                            <div className="col-sm-4">
                                <h4>Help</h4>
                                <ul>
                                    <li><i className="fa fa-angle-right"></i> <Link to="/cookies-policy">Cookies policy</Link></li>
                                    <li><i className="fa fa-angle-right"></i> <Link to="/terms-of-service">Terms of service</Link></li>
                                    <li><i className="fa fa-angle-right"></i> <Link to="/privacy-policy">Privacy policy</Link></li>
                                </ul>
                            </div>
                            <div className="col-sm-4">
                                <h4>Follow Us</h4>
                                <a href="https://www.linkedin.com/company/hyde-international-uk/?originalSubdomain=uk" className="social"><i className="fa fa-linkedin" title='LinkedIn'></i></a>
                            </div>
                        </div>

                        <div className="container">
                            <div className=" text-center">
                                &copy; Copyright <strong>HYDE INTERNATIONAL TALENTS (UK)</strong>. All Rights Reserved
                            </div>
                        </div>
                    </div>

                </footer>

















            </div>
        )
    }
}
