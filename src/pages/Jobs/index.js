import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { fetchReq, getRole } from '../../utils/utils';
import Search from '../../components/search';
import Footer from '../../components/Footer';
import JobTitleCard from '../../components/jobTitleCard';
import Pagination from '../../components/pagination';
import { sliceData } from '../../asset/paginationConfig';
import { jobTypeList } from '../../asset/jobTypeList';
import { distanceList } from '../../asset/distanceList';

import TopNav from '../../components/TopNav'
import '../../styles/jobs.css';

export default class Jobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            role: getRole(),
            projectData: [],
            filterData: [],
            activePage: 1,
            offset: 0,
            totalItemsCount: 0,
        }

        this.lessField = ['project_id', 'job_title', 'job_type', 'job_description', 'professional_field', 'organization_info', 'essential_skills',
                         'start_date', 'employer', 'location', 'salary', 'currency', 'close_date', 'required_expertise', 'responsibility'];
        this.itemsCountPerPage = 20;

        this.filterDataHandler = this.filterDataHandler.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.receiveUpdateData();
    }

    receiveUpdateData() {
        fetchReq('/api/fetchProject/all').then(data => {
            const { offset } = this.state;
            const [totalItemsCount, slice] = sliceData(data, offset, this.itemsCountPerPage);

            this.setState({
                projectData: data,
                filterData: data,
                totalItemsCount,
                displayData: slice
            })
        }).catch(err => alert(err));
    }

    filterDataHandler(filterData) {
        const { offset } = this.state;
        const [totalItemsCount, slice] = sliceData(filterData, offset, this.itemsCountPerPage);

        this.setState({
            totalItemsCount,
            filterData,
            displayData: slice
        });
    }

    handlePageClick = (pageNumber) => {
        const pageIndex = pageNumber - 1;
        const offset = pageIndex * this.itemsCountPerPage;

        this.setState({
            activePage: pageNumber,
            offset
        }, () => {
            const { offset, filterData } = this.state;
            const [totalItemsCount, slice] = sliceData(filterData, offset, this.itemsCountPerPage);

            this.setState({
                totalItemsCount,
                displayData: slice
            })
        });
    };

    getProjectList(){
        const { displayData } = this.state;
        let rows = []
        let jobcards = []

        _.forEach(displayData, (item, index) => {    
            jobcards.push(<JobTitleCard key={`jobtitlecard-${index}`}
                                        data={item} 
                                        link={`/applyjob/${item.project_id}`}/>);

            if ((index % 5 === 4) || (displayData.length === index + 1)){
                rows.push(<div key={`jobtitlecardrows-${index}`} className="category-jobs_grid" style={{marginBottom: 30}}>
                        {[...jobcards]}
                    </div>)
                jobcards = []          
            }
        });

        return rows;
    }

    render() {
        const { projectData, activePage, totalItemsCount, role } = this.state;

        return (
            <div>
                <TopNav></TopNav>
                <section id="top" className="hero-category">

                    <div className=" Container hero-category_title">
                        <h1>Opportunity Land <span style={{display: 'block', color: 'white'}}>Welcome</span></h1>
                    </div>
                </section>

                <section id="filter-part">
                    <div className="container">
                        <div >                       
                            <Search
                                fullData={projectData}
                                dataFilterableField={this.lessField}
                                filterDataHandler={this.filterDataHandler}
                                placeholder={"search job title, job types, industry, salary"}
                                showGroupFilter={true}
                                groupFilterField={[{'type': 'number', 'field': 'salary', 'header': 'Salary'}, 
                                                {'type': 'enumerate', 'field': 'job_type', 'header': 'Job Type', 'options': jobTypeList}, 
                                                {'type': 'enumerate', 'field': 'distance', 'header': 'Location', 'options': distanceList}]}
                                intersectionByKey={"project_id"}
                            />
                        </div> 
                    </div>
                </section>

                <section className="all-jobs">
                    <span className="category-shape"></span>
                    <div className="header-grid">
                        <h1>
                            <span style={{color: 'white'}}>Jo</span>bs <span style={{display: 'block'}}>
                            <span style={{color: 'white'}}>Op</span>portunities</span>
                        </h1>
                    </div>
                    <div className="container-fluid"> 
                        {this.getProjectList()}

                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={this.itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            onPageChange={this.handlePageClick}
                        />
                    </div>
                </section>

                <Footer/>
            </div>
        )
    }
}
