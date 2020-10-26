import React, { Component } from 'react'
import ReactPaginate from 'react-js-pagination';
import '../styles/pagination.css'


export default class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activePage: props.activePage,
            totalItemsCount: props.totalItemsCount
        }

        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                activePage: nextProps.activePage,
                totalItemsCount: nextProps.totalItemsCount
            })
        }
    }

    handlePageChange = (PageNumber) => {
        const { onPageChange } = this.props;

        this.setState({
            activePage: PageNumber
        }, () => onPageChange(this.state.activePage));
    }

    render() {
        const { itemsCountPerPage, pageRangeDisplayed } = this.props;
        const { totalItemsCount, activePage } = this.state;

        return (
            <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                pageRangeDisplayed={pageRangeDisplayed || 5}
                totalItemsCount={totalItemsCount}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        )
    }
}
