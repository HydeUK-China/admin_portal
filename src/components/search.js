import React, { Component } from 'react';

import '../styles/search.css';

export default class Search extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        const props = this.props;

        return (
            <div className="search">
                <label>{props.text} :</label>
                <input type="text" placeholder={props.placeholder} required />
                <button className="search-btn">Search</button>
            </div>
        )
    }
  }