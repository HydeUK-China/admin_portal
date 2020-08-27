import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import '../styles/tab.css';

export default class Tab extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        const props = this.props;

        return (
            <div className="left-nav">
                <NavLink to={`/admin/${props.path}`} activeClassName="App-link">
                    {props.name}
                </NavLink> 
            </div>
        )
    }
  }