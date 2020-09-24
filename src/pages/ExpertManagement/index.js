import React, { Component } from 'react';
import _ from 'lodash';
import Search from '../../components/search';
import ModalOpsRow from '../../components/modalOpsRow';
import { fetchReq } from '../../utils/utils';
import AddExpertModal from '../../components/addExpertModal';

export default class ExpertManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            filterData: null,
            showAdd: false
        }

        this.lessHeader = ['ID', 'Title', 'First Name', 'Last Name', 'Expertise', 'Category', 'Level', 'Email', 'Phone No', 'CV']

        this.lessField = ['id', 'title', 'first_name', 'last_name', 'expertise', 'category', 'level', 'email', 'phone_no']

        this.moreHeader = ['Education', 'Employment', 'Projects', 'Patents',
        'Field of Speciality', 'Awards', 'Products', 'Publication Date', 'Recent Major Research Projects', 
        'Collaborative Project Proposal']

        this.moreField = ['education', 'employment', 'projects', 'patents',
        'field_of_speciality', 'awards', 'products', 'publication_date', 'recent_major_research_projects', 
        'collaborative_project_proposal']

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handleToggleAdd = this.handleToggleAdd.bind(this);
        this.closeAddHandler = this.closeAddHandler.bind(this);
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
        return _.map(this.lessHeader, (item, index) => {
            return <h6 key={`expertMgt-${index}`}>{item}</h6>
        })
    }

    getTable() {
        const { filterData } = this.state;
        const { role } = this.props;
        return _.map(filterData, (item, index) => {
            return <ModalOpsRow
                role={role}
                key={`expertRow-${index}`}
                rowData={item}
                rowLessField={this.lessField}
                rowMoreField={this.lessField.concat(this.moreField)}
                rowMoreHeader={this.lessHeader.concat(this.moreHeader)}
                modalHeader='Expert Info'
                />
        })
    }

    handleToggleAdd = () => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    }

    closeAddHandler = (hide) => {
        this.setState({
            showAdd: hide
        })
    }

    render() {
        const { data, showAdd } = this.state;
        const { role } = this.props;

        return (
            <div className="database">
                <div className="search">
                    <Search
                        fullData={data}
                        dataFilterableField={this.lessField}
                        filterDataHandler={this.filterDataHandler}
                    />
                    {role === '__admin__' ? <button className="search-btn" onClick={this.handleToggleAdd}>Add</button> : null}
                </div>
                <AddExpertModal show={showAdd} close={this.closeAddHandler}/>
                <div className="dataheader_expert">
                    {this.getHeader()}
                </div>
                {this.getTable()}
            </div>
        )
    }
}