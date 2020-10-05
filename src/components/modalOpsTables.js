import React, { Component } from 'react';
import _ from 'lodash';
import TableModal from './tableModal';

export default class ModalOpsTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outerData: props.outerData,
            innerData: props.innerData,
            showInfo: false
        }

        this.tableFieldTitle = _.zipObject(props.outerLessField, props.outerLessHeader);

        this.handleToggleShow = this.handleToggleShow.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                outerData: nextProps.outerData,
                innerData: nextProps.innerData
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
        const { outerDataIdentifier, outerLessHeader, outerLessField, innerLessHeader, innerLessField } = this.props;
        const { outerData, innerData, showInfo } = this.state;

        return (
            <div className='table-box'>
                <div className="dataheader_project">
                    {
                        outerData && outerData[0] ?
                            _.map(_.pick(this.tableFieldTitle, _.keys(outerData[0])), (value, key) => {
                                return <h6 key={`dataHeader-${key}`}>{value}</h6>
                            })
                            : null
                    }
                </div>

                {
                    _.map(outerData, (item, index) => {
                        return (
                            <div key={`outerTableRow-${index}`} className='database'>
                                <div className="datatable_project">
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
                    tableData={innerData}
                    onClose={(hide) => this.closeModalHandler(hide)}
                    show={showInfo}
                />
            </div>

        );
    }

}