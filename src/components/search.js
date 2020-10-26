import React, { Component } from 'react';
import FilterGroup from './filterGroup';
import _ from 'lodash';

import '../styles/search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterInput: "",
            firstInit: true,
            groupResults: null
        };

        this.finalSearch = this.finalSearch.bind(this);
    }

    handleGlobalFilterChange = e => {
        const { firstInit, groupResults } = this.state;
        const { fullData } = this.props;
        const value = e.target.value || "";

        this.setState({ 
            filterInput: value,
            groupResults: firstInit ? fullData : groupResults, /**this.props.fullData is [] at first render, to avoid intersectionBy [], initialize groupResults with fullData*/
            firstInit: false
        }, () => {
            this.finalSearch();
        });
    };

    globalSearch = () => {
        const { filterInput } = this.state;
        const { fullData, dataFilterableField } = this.props;

        const filteredData = _.filter(fullData, item => {
            let condition = false;

            _.forEach(dataFilterableField, (_item, _index) => {
                condition = condition || (item[_item] && item[_item].toString().toLowerCase().includes(filterInput.toLowerCase()))
            })
            return condition;
        });

        return filteredData;
    }

    groupSearch = (groupResults) => {
        this.setState({ 
            groupResults,
            firstInit: false
        }, () => {
            this.finalSearch()
        })
    }

    finalSearch = () => {
        const { filterDataHandler, showGroupFilter, intersectionByKey } = this.props;
        const { groupResults } = this.state;
        
        const globalResults = this.globalSearch();
        
        if (showGroupFilter) {
            const finalResults = _.intersectionBy(globalResults, groupResults, intersectionByKey);
            filterDataHandler(finalResults);
        } else {
            filterDataHandler(globalResults);
        }
    }



    render() {
        const { filterInput } = this.state;
        const { placeholder, showGroupFilter, groupFilterField, fullData } = this.props;

        return (
        <div className="filters disp-c">
            <input className="filter-input"
                value={filterInput}
                onChange={this.handleGlobalFilterChange}
                placeholder={placeholder || "Global search"}
            />
            {
                showGroupFilter ?
                    <FilterGroup
                        fullData={fullData}
                        groupFilterField={groupFilterField}
                        filterDataHandler={this.groupSearch}
                    /> : null
            }
         </div>
        )
    }
}