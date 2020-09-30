import React, { Component } from 'react';
import _ from 'lodash';
import ModalOpsRow from './modalOpsRow';
import { Button, Modal } from 'react-bootstrap';

export default class TableModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            tableData: props.tableData
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                show: nextProps.show,
                tableData: nextProps.tableData
            })
        }
    }

    closeModal =() => {
        const { onClose } = this.props;

        this.setState({
            show: false
        }, () => onClose(this.state.show));
    }

    render() {
        const { tableHeader, rowField } = this.props;
        const { tableData, show } = this.state;

        return (
            <Modal show={show} onHide={this.closeModal} size='xl'>
                <Modal.Header closeButton onHide={this.closeModal}>Job Matching</Modal.Header>
                <Modal.Body>
                    <div className="dataheader_expert">
                        {
                            _.map(tableHeader, (item, index) => {
                                return <h6 key={`dataHeader-${index}`}>{item}</h6>
                            })
                        }
                    </div>

                    {
                        _.map(tableData, (item, index) => {
                            return (
                                <div key={`tableModalRow-${index}`} className='database'>
                                    <div className="datatable_expert">
                                        {
                                            _.map(_.pick(item, rowField), (_value, _key) => {
                                                return <label key={`row-${_key}`}>{_value}</label>
                                            })
                                        }
                                        <button className='more-info-btn'>Download</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
        );
    }

}