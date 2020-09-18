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

        const { rowData, rowField, showMoreButtonText, children, role } = this.props;
console.log(role)
        return (
            <div className='database'>

                <div className="datatable_expert">
                    {_.map(_.pick(rowData, rowField), (item, index) => {
                        return <label key={`row-${index}`}>{item}</label>
                    })
                    }
                                       {role === '__admin__' ? <select className='more-info-btn' onChange={this.handleSelect}>
                        <option value='MoreInfo'>More info</option>
                        <option value='Edit'>Edit</option>
                        <option value='Remove'>Remove</option>
                        <option value='Add'>Add</option>
                    </select> : <select className='more-info-btn' onChange={this.handleSelect}>
                            <option value='MoreInfo'>More info</option>
                            <option value='Edit'>Edit</option></select>}
                </div>
                <div className={this.state.showInfo ? 'showContent content ' : 'content'} >
                    {children}
                </div>
            </div>


        );
    }

}