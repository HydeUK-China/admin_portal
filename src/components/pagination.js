import React, { Component, Fragment } from 'react'
import ReactPaginate from 'react-bootstrap/Pagination';

export default class Pagination extends Component {


    render() {

        return (
            <Fragment>
                <ReactPaginate>
                    <ReactPaginate.First />
                    <ReactPaginate.Prev />
                    <ReactPaginate.Item>{1}</ReactPaginate.Item>
                    <ReactPaginate.Ellipsis />

                    <ReactPaginate.Item>{10}</ReactPaginate.Item>
                    <ReactPaginate.Item>{11}</ReactPaginate.Item>
                    <ReactPaginate.Item active>{12}</ReactPaginate.Item>
                    <ReactPaginate.Item>{13}</ReactPaginate.Item>
                    <ReactPaginate.Item disabled>{14}</ReactPaginate.Item>

                    <ReactPaginate.Ellipsis />
                    <ReactPaginate.Item>{20}</ReactPaginate.Item>
                    <ReactPaginate.Next />
                    <ReactPaginate.Last />
                </ReactPaginate>
            </Fragment>
        )
    }
}
