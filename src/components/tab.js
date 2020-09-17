import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/tab.css';

export default class Tab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { path, name } = this.props;

        return (
            <div className="left-nav">
                <NavLink to={path} activeClassName="App-link">
                    {name}
                </NavLink>
            </div>
        )
    }
}