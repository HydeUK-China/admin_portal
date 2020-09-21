import React, { Component } from 'react';
import _ from 'lodash';
import Search from '../../components/search';
import ExpertTab from '../../components/ExpertTab';

import { fetchReq } from '../../utils/utils';
import AddExpert from '../../components/addExpert';

export default class ExpertManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            showAdd: false
        }

        this.header = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No', 'CV']

        this.dataField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handleToggleAdd = this.handleToggleAdd.bind(this);
    }

    componentDidMount() {
        const { role } = this.props;
        const expertId = 1;
        const url = role === '__admin__' ? '/api/fetchExpert/all' : `/api/fetchExpert/${expertId}`
        fetchReq(url).then(data => {
            this.setState({
                data,
                filterData: data
            })
        }).catch(err => console.log(err));
    }

    filterDataHandler(filterData) {
        this.setState({
            filterData
        })
    }

    getHeader() {
        return _.map(this.header, (item, index) => {
            return <h6 key={`expertMgt-${index}`}>{item}</h6>
        })
    }

    getTable() {
        const { filterData } = this.state;
        const { role } = this.props;
        return _.map(filterData, (item, index) => {
            return <ExpertTab
                role={role}
                key={`collapsableRow-${index}`}
                rowData={item}
                rowField={this.dataField}>
            </ExpertTab>
        })
    }

    handleToggleAdd = () => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    render() {
        const { data, showAdd } = this.state;
        const {role} = this.props;

        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.dataField}
                        filterDataHandler={this.filterDataHandler}
                    />
                    <button className="search-btn" onClick={this.handleToggleAdd}>Add</button>
                </div>
                <AddExpert show={showAdd} />
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}