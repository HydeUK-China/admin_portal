import React, { Component } from 'react';
import _ from 'lodash';
import Search from '../../components/search';
import CollapsableRow from '../../components/collapsableRow';
import ExpertCV from '../../components/expertCV';
import CollapsableCreate from '../../components/collapsableCreate';
import { fetchReq } from '../../utils/utils';

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
        fetchReq('/api/fetchExpert').then(data => {
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

        return _.map(filterData, (item, index) => {
            return <CollapsableRow
                key={`collapsableRow-${index}`}
                rowData={item}
                rowField={this.dataField}
                showMoreButtonText={'CV'}>
                <ExpertCV />
            </CollapsableRow>
        })
    }

    handleToggleAdd = () => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    render() {
        const { data, showAdd } = this.state;

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
                <CollapsableCreate show={showAdd} />
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}