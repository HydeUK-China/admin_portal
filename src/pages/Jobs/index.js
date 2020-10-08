import React, { Component } from 'react';
import _ from 'lodash';
import { fetchReq } from '../../utils/utils';
import Search from '../../components/search';
import Footer from '../../components/Footer';
import JobTitleCard from '../../components/jobTitleCard';
import Pagination from '../../components/pagination';
import { sliceData } from '../../asset/paginationConfig';

import '../../styles/jobs.css';

export default class Jobs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectData: [],
            filterData: [],
            activePage: 1,
            offset: 0,
            totalItemsCount: 0,
        }

        this.lessField = ['project_id', 'job_title', 'start_date', 'employer', 'area', 'salary', 'currency', 'close_date'];
        this.itemsCountPerPage = 10;

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

        return _.map(displayData, (value, index) => {
            return <JobTitleCard key={`jobtitlecard-${index}`}
                        data={value} />
        })
    }

    render() {
        const { projectData, activePage, totalItemsCount } = this.state;

        return (
            <div>
                <section id="top" className="category-hero">
                    <header id="header">
                        <div className="brand-container">
                            <a className="brand" href="/">
                            Hyde International Talents
                        
                            </a>
                        </div>
                        <nav className="main-nav">
                            <a className="nav-item" href="/" style={{color: 'white'}}>Home</a>
                            <a className="nav-item" href="/jobPages/category-page.html" style={{color: 'white'}}>Jobs</a>
                            <a className="nav-item" href="/about-page.html" style={{color: 'white'}}>About</a>
                            <a className="nav-item" href="/contact-page.html" style={{color: 'white'}}>Contact</a>
                            <div className="sign-in">
                            <a className="nav-item user" href="accounts/login.html">
                                <div className="fa fa-user-o"></div>
                            </a>
                            </div>
                        </nav>       
                    </header>
            
                    <div className="hero-category_title">
                        <h1>Opportunity Land <span style={{display: 'block', color: 'white'}}>Welcome</span></h1>
                    </div>
                </section>

                <section id="filter-part">
                    <div className="container">
                        <div className="filters">
                            {/* <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">All
                                    <span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                    <li><a href="#">category</a></li>
                                    <li><a href="#">category</a></li>
                                    <li><a href="#">category</a></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Industry
                                    <span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                    <li><a href="#">category</a></li>
                                    <li><a href="#">category</a></li>
                                    <li><a href="#">category</a></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Advanced
                                    <span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                    <li><a href="#">category</a></li>
                                    <li><a href="#">category</a></li>
                                    <li><a href="#">category</a></li>
                                </ul>
                            </div> */}
                            {/* <input className="form-control" id="myInput" type="text" placeholder="Search.."/> */}
                            <Search
                                fullData={projectData}
                                dataFilterableField={this.lessField}
                                filterDataHandler={this.filterDataHandler}
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
                        <div className="category-jobs_grid">
                            {this.getProjectList()}
                        </div>

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
