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

    getProjectList() {
        const { displayData } = this.state;
        let rows = []
        let jobcards = []

        _.forEach(displayData, (item, index) => {
            jobcards.push(<JobTitleCard key={`jobtitlecard-${index}`}
                data={item}
                link={`/applyjob/${item.project_id}`} />);

            if ((index % 5 === 4) || (displayData.length === index + 1)) {
                rows.push(<div key={`jobtitlecardrows-${index}`} className="category-jobs_grid" style={{ marginBottom: 30 }}>
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
                {/* <section id="top" className="hero-category">
                    <div className="hero-category">
                        <div className=" Container text-left px-5 mx-0 hero-category_title">
                            <h1>Opportunity Land <br/>Welcome</h1>
                        </div>
                    </div>
                </section> */}
                <section className="hero-category">
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-light bg-transperent px-3 text-dark ">
                            <NavLink className="navbar-brand text-dark" to="/home"><h2>HI Talents</h2></NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarToggler">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/home">Home {/* <span className="sr-only">(current)</span> */}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/contactus">Contact Us</NavLink>
                                    </li>
                                    <li className="sign-in">
                                        {role === '__admin__' ?
                                            <NavLink className="nav-item user" to="/mgt/admin_dashboard">
                                                <div className=" fa fa-user-o"></div>
                                            </NavLink>
                                            :
                                            (role === 'expert' ?
                                                <NavLink className="nav-item user" to="/mgt/expert_profile">
                                                    <div className=" fa fa-user-o"></div>
                                                </NavLink>
                                                : <NavLink className="nav-item user" to="/login">
                                                    <div className="fa fa-user-o"></div>
                                                </NavLink>)
                                        }
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </header>
                    <div className="p-2 hero-category_title rounded">

                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className="col-md-6 px-3 text-primary text-right">
                                <h1 className="display-4">Browse jobs by location and category</h1>
                                {/* <p >Job Alerts service allows you to stay up-to-date with the latest jobs matching your criteria. </p> */}
                                <p>Start Applying to land your dearm job.</p>
                            </div>

                        </div>
                    </div>
                </section>
                <section id="filter-part">
                    <div className="container  px-3 py-5">
                        <div >
                            <Search
                                fullData={projectData}
                                dataFilterableField={this.lessField}
                                filterDataHandler={this.filterDataHandler}
                                placeholder={"search job title, job types, industry, salary"}
                                showGroupFilter={true}
                                groupFilterField={[{ 'type': 'number', 'field': 'salary', 'header': 'Salary' },
                                { 'type': 'enumerate', 'field': 'job_type', 'header': 'Job Type', 'options': jobTypeList },
                                { 'type': 'enumerate', 'field': 'distance', 'header': 'Location', 'options': distanceList }]}
                                intersectionByKey={"project_id"}
                            />
                        </div>
                    </div>
                </section>

                <section className=" all-jobs container-fluid">
                    <div className="grid-container">
                        {this.getProjectList()}

                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={this.itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            onPageChange={this.handlePageClick}
                        />
                    </div>
                </section>

                <Footer />
            </div>
        )
    }
}
