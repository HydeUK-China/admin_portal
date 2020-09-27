import React, { Component, Fragment } from 'react'
import ReactPaginate from 'react-js-pagination';


export default class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activePage: 1
        }
    }

    handlePageChange = (PageNumber) => {
        this.setState({ activePage: PageNumber })
    }



    render() {

        return (
            <Fragment>
                <ReactPaginate
                    activePage={this.state.activePage}
                    itemsCountPerPage={1}
                    pageRangeDisplayed={5}
                    totalItemsCount={10}
                    onChange={this.handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                />

            </Fragment>
        )
    }
}
