import React, { Component } from 'react';
import _ from 'lodash';
import TableModal from './tableModal';

export default class ModalOpsTables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outerData: props.outerData,
            showInfo: Array.from({length: props.outerData}, () => false)
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

    handleToggleShow(index) {
        const {showInfo} = this.state;
        showInfo[index] = !showInfo[index];
        
        this.setState({
            showInfo
        })
    }

    closeModalHandler(index, hide){
        const {showInfo} = this.state;
        showInfo[index] = hide;

        this.setState({
            showInfo
        })
    }

    render() {
        const { outerLessHeader, outerLessField, innerLessHeader, innerLessField } = this.props;
        const { outerData, showInfo } = this.state;

        return (
            <div className='table-box'>
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
                                    <button className='more-info-btn' onClick={() => this.handleToggleShow(index)}> More Info</button>
                                </div>

                                <TableModal
                                    key={`row-more-info-${index}`}
                                    tableHeader={innerLessHeader}
                                    rowField={innerLessField}
                                    tableData={item.expertData}
                                    onClose={(hide) => this.closeModalHandler(index, hide)}
                                    show={showInfo[index]}
                                />

                            </div>
                        )
                    })
                }

            </div>

        );
    }

}