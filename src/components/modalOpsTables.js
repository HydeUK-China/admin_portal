import React, { Component } from 'react';
import _ from 'lodash';
import TableModal from './tableModal';

export default class ModalOpsTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outerData: props.outerData,
            showInfo: false
        }

        this.handleToggleShow = this.handleToggleShow.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                outerData: nextProps.outerData
            })
        }
    }

    handleToggleShow() {
        this.setState({
            showInfo: !this.state.showInfo
        })
    }

    closeModalHandler(hide){
        this.setState({
            showInfo: hide
        })
    }

    render() {
        const { outerLessHeader, outerLessField, innerLessHeader, innerLessField } = this.props;
        const { outerData, showInfo } = this.state;

        return (
            <div>
                <div className="dataheader_expert">
                    {
                        _.map(outerLessHeader, (item, index) => {
                            return <h6 key={`dataHeader-${index}`}>{item}</h6>
                        })
                    }
                </div>

                {
                    _.map(outerData, (item, index) => {
                        return (
                            <div key={`outerTableRow-${index}`} className='database'>
                                <div className="datatable_expert">
                                    {
                                        _.map(_.pick(item, outerLessField), (_value, _key) => {
                                            return <label key={`row-${_key}`}>{_value}</label>
                                        })
                                    }
                                    <button className='more-info-btn' onClick={this.handleToggleShow}> More Info</button>
                                </div>

                                <TableModal
                                    tableHeader={innerLessHeader}
                                    rowField={innerLessField}
                                    tableData={item.expertData}
                                    onClose={this.closeModalHandler}
                                    show={showInfo}
                                />

                            </div>
                        )
                    })
                }

            </div>

        );
    }

}