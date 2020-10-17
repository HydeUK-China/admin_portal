import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Tab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { path, name, icon, showWarning } = this.props;

        return (
            <li className="sidebar-nav-item">
                <NavLink to={path} className="sidebar-nav-link">
                    <span className="fa-stack" style={{width: 'auto'}}>
                        <i className={`fa ${icon}`} aria-hidden="true"> </i>
                        {showWarning ? <i className="fa fa-exclamation top-right-badge" aria-hidden="true"> </i> : null}
                    </span>
                    <span className="link-text"> {name}</span>
                </NavLink>
            </li>
        )
    }
}