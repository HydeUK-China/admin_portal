import React, { Component } from 'react';
import _ from 'lodash';

import '../styles/database.css';

export default class CollapsableRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false
        };

        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    }

    render() {

        const { rowData, rowField, showMoreButtonText, children } = this.props;

        return (
            <div className='database'>

                <div className="datatable_expert">
                    {_.map(_.pick(rowData, rowField), (item, index) => {
                        return <label key={`row-${index}`}>{item}</label>
                    })
                    }
                    <button className="more-info-btn" onClick={this.handleToggle}>
                        {showMoreButtonText}
                    </button>
                </div>
                <div className={this.state.showInfo ? 'showContent content ' : 'content'} >
                    {children}
                </div>
            </div>


        );
    }

}