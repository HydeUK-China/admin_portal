import React, { Component } from 'react';
import _ from 'lodash';

import '../styles/search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterInput: ""
        };
    }

    handleGlobalFilterChange = e => {
        const value = e.target.value || "";
        this.setState({ filterInput: value }, () => {
            this.globalSearch();
        });
    };

    globalSearch = () => {
        const { filterInput } = this.state;
        const { fullData, dataFilterableField, filterDataHandler } = this.props;

        const filteredData = _.filter(fullData, item => {
            let condition = false;

            _.forEach(dataFilterableField, (_item, _index) => {
                condition = condition || (item[_item] && item[_item].toString().toLowerCase().includes(filterInput.toLowerCase()))
            })
            return condition;
        });

        filterDataHandler(filteredData);
    };

    render() {
        const { filterInput } = this.state;
        const { placeholder } = this.props;

        return (
            <input
                value={filterInput}
                onChange={this.handleGlobalFilterChange}
                placeholder={placeholder || "Global search"}
            />
        )
    }
}