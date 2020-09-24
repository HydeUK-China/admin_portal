import React, { Component } from 'react';
import _ from 'lodash';
// import '../styles/database.css';
import { Button, Modal } from 'react-bootstrap';


export default class InfoEditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            showInput: false,
            data: props.data
        }

        this.closeModal = this.closeModal.bind(this);
        this.clickEdit = this.clickEdit.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                show: nextProps.show,
                data: nextProps.data
            })
        }
    }

    closeModal() {
        const { close } = this.props;

        this.setState({
            show: false
        }, () => {
            close(this.state.show);
        });
    }

    clickEdit() {
        this.setState({
            showInput: true
        });
    }

    clickConfirm() {
        this.setState({
            showInput: false
        });
    }

    handleTextChange(e, key) {
        const { onDataChange } = this.props;
        const { data } = this.state;

        const tmp_data = Object.assign(data, {
            [key]: e.target.value
        })
        this.setState({
            data: tmp_data
        }, () => {
            onDataChange(this.state.data)
        });
    }

    render() {
        const { fileds, headers, modalHeader, allowEdit } = this.props;
        const { data, show, showInput } = this.state;

        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                show={show} >
                <Modal.Header closeButton onHide={this.closeModal} id="contained-modal-title-vcenter">{modalHeader}</Modal.Header>

                <Modal.Body>
                    <div className='content-general-info'>
                        {showInput ?
                            _.map(_.pick(data, fileds), (value, key) => {
                                return (
                                    <div key={`modal-${key}`} className='columns-merge'>
                                        <h2>{key}</h2>
                                        <textarea className="form-control"
                                            rows='2'
                                            defaultValue={value}
                                            onChange={(e) => this.handleTextChange(e, key)}></textarea>
                                    </div>
                                )
                            })
                            :
                            _.map(_.pick(data, fileds), (value, key) => {
                                return (
                                    <div key={`modal-${key}`} className='columns-merge'>
                                        <h2>{key}</h2>
                                        <div>{value}</div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    {
                        allowEdit ?
                            (showInput ?
                                <Button onClick={this.clickConfirm}> Save </Button>
                            : <Button onClick={this.clickEdit}> Edit </Button>)
                        : null
                    }
                    <Button>Download</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}