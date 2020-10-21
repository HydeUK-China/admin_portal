import React, { Component } from 'react';
import _ from 'lodash';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import '../styles/inputrange.css';

export default class FilterGroup extends Component {
    constructor(props) {
        super(props);

        this.createNumberRangeKeyForState();
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.groupSearch = this.groupSearch.bind(this);
    }

    createNumberRangeKeyForState() {
        const { groupFilterField } = this.props;
        
        let obj = {};
        const numObj = _.filter(groupFilterField, (o) => { return o.type === 'number'});
        const enumObj = _.filter(groupFilterField, (o) => { return o.type === 'enumerate'});

        _.forEach(numObj, (o) => {
            obj[o.field] = {min: 0, max: 500000}
        });

        _.forEach(enumObj, (o) => {
            obj[o.field] = ''
        });

        this.state = {
            ...obj
        }
    }

    handleFilterChange = (value, key) => {
        this.setState({
            [key]: value
        }, () => {
            this.groupSearch()
        })
    };

    groupSearch = () => {
        const { fullData, filterDataHandler } = this.props;

        const filteredData = _.filter(fullData, item => {
            let condition = true;

            _.forEach(this.state, (v, k) => {
                if(_.has(v, 'min')){
                    const num = _.parseInt(item[k])
                    condition = condition && (num >= v.min && num <= v.max)
                } else {
                    const str = item[k]    
                    if(v !== ''){
                        condition = condition && (str === v)
                    }
                }
            })
            return condition;
        });
        
        filterDataHandler(filteredData);
    };

    render() {
        const { groupFilterField } = this.props;

        return (
            <form className="filter-form">
                <div className="controls">
                    <div className="row">
                        {
                            _.map(groupFilterField, (item, index) => {
                                if (item.type === 'number') {
                                    return (
                                        <div key={`filter-group-${index}`} className="col-md-6 col-sm-12" style={{ paddingRight: 35, paddingLeft: 0 }}>
                                            <div className="form-group">
                                                <label>{item.header}</label>
                                                <InputRange
                                                    draggableTrack
                                                    maxValue={500000}
                                                    minValue={0}
                                                    step={500}
                                                    onChange={(value) => this.setState({ [item.field]: value })}
                                                    onChangeComplete={value => this.handleFilterChange(value, item.field)}
                                                    value={this.state[item.field]} />
                                            </div>
                                        </div>)
                                } else if (item.type === 'enumerate') {
                                    return (
                                        <div key={`filter-group-${index}`} className="col-md-3 col-sm-12">
                                            <div className="form-group">
                                                <label>{item.header}</label>
                                                <select className="form-control" defaultValue='' required
                                                    onChange={(e) => this.handleFilterChange(e.target.value, item.field)}>
                                                    <option value=''>All</option>
                                                    {_.map(item.options, (_item, _index) => {
                                                        return <option key={`${item.field}-${_index}`} value={_item}>{_item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>

                </div>

            </form>
        )
    }
}