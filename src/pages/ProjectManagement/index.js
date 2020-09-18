import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import CollapsableRow from '../../components/collapsableRow';
import ProjectInfo from '../../components/projectInfo';

export default class ProjectManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null
        }

        this.header = ['ID', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.dataField = ['id', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

        this.filterDataHandler = this.filterDataHandler.bind(this);
    }

    componentDidMount() {
        fetchReq('/api/fetchProject').then(data => {
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
            return <h6 key={`employerMgt-${index}`}>{item}</h6>
        })
    }

    getTable() {
        const { filterData } = this.state;
        const { role } = this.props;
        
        return _.map(filterData, (item, index) => {
            return <CollapsableRow
                role={role}
                key={`collapsableRow-${index}`}
                rowData={item}
                rowField={this.dataField}
                showMoreButtonText={'More info'}>
                <ProjectInfo />
            </CollapsableRow>
        })
    }

    render() {
        const { data } = this.state;


        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.dataField}
                        filterDataHandler={this.filterDataHandler}
                    />
                </div>

                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}