import React, { Component } from 'react';
import _ from 'lodash';
import TableModal from './tableModal';

export default class ModalOpsTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outerData: props.outerData,
            innerData: props.innerData,
            showInfo: false,
            sortKey: props.sortKey,
            sortOrder: props.sortOrder
        }

        this.tableFieldTitle = _.zipObject(props.outerLessField, props.outerLessHeader);

        this.handleToggleShow = this.handleToggleShow.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                outerData: nextProps.outerData,
                innerData: nextProps.innerData,
                sortKey: nextProps.sortKey,
                sortOrder: nextProps.sortOrder
            })
        }
    }

    handleToggleShow(id) {
        const { onRowClick } = this.props;

        this.setState({
            showInfo: true
        }, () => onRowClick(id))
    }

    closeModalHandler(hide) {
        this.setState({
            showInfo: hide
        })
    }

    render() {
        const { outerDataIdentifier, outerLessHeader, outerLessField, innerLessHeader, innerLessField, innerMoreField, innerMoreHeader, onSortTable } = this.props;
        const { outerData, innerData, showInfo, sortKey, sortOrder } = this.state;

        return (
            <div className='table-box'>
                <div className="dataheader_project_matching">
                    {
                        outerData && outerData[0] ?
                            _.map(_.pick(this.tableFieldTitle, _.keys(outerData[0])), (value, key) => {
                                return <h6 key={`dataHeader-${key}`} className="dataheader-title" onClick={() => onSortTable(key)}>
                                    <span>{value}</span>
                                    {sortKey === key ? 
                                        (sortOrder === 'asc' ? 
                                            <i className="fa fa-sort-asc" aria-hidden="true"></i> :
                                            <i className="fa fa-sort-desc" aria-hidden="true"></i>)
                                    : null}
                                </h6>
                            })
                            : null
                    }
                </div>

                {
                    _.map(outerData, (item, index) => {
                        return (
                            <div key={`outerTableRow-${index}`} className='database'>
                                <div className="datatable_project_matching">
                                    {
                                        _.map(_.pick(item, outerLessField), (_value, _key) => {
                                            return <label key={`row-${_key}`}>{_value}</label>
                                        })
                                    }
                                    <button className='more-info-btn' onClick={() => this.handleToggleShow(item[outerDataIdentifier])}> More Info</button>
                                </div>
                            </div>
                        )
                    })
                }
                <TableModal
                    key={`row-more-info`}
                    rowHeader={innerLessHeader}
                    rowField={innerLessField}
                    downloadField={innerMoreField}
                    downloadHeader={innerMoreHeader}
                    tableData={innerData}
                    onClose={(hide) => this.closeModalHandler(hide)}
                    show={showInfo}
                />
            </div>

        );
    }

}