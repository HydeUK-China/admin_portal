import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Tab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { path, name, icon } = this.props;

        return (
            <li className="sidebar-nav-item">
                <NavLink to={path} className="sidebar-nav-link">
                    <i className={`fa ${icon}`} aria-hidden="true"> </i>
                    <span className="link-text"> {name}</span>
                </NavLink>
            </li>
        )
    }
}