import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { currencyList } from '../asset/currencyList';
import { placeholder } from '../asset/placeholder';

export default class InfoEditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            showInput: false,
            data: props.data
        }

        this.fieldTitle = _.zipObject(props.fileds, props.headers);
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

    clickEdit(e) {
        e.preventDefault();

        this.setState({
            showInput: true
        });
    }

    clickConfirm(e) {
        e.preventDefault();

        this.setState({
            showInput: !this.state.showInput
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
        const { fileds, modalHeader, allowEdit } = this.props;
        const { data, show, showInput } = this.state;

        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                show={show} onHide={this.closeModal}>
                <Modal.Header closeButton onHide={this.closeModal} id="contained-modal-title-vcenter">{modalHeader}</Modal.Header>

                <Modal.Body>
                    <form onSubmit={this.clickConfirm}>
                        <div className='content-general-info'>
                            {showInput ?
                                _.map(_.pick(data, fileds), (value, key) => {
                                    if (key === 'id' || key === 'expert_id' || key === 'project_id' || key === 'matching_id') {
                                        // readonly input
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <input className="form-control" readOnly
                                                    defaultValue={value} />
                                            </div>
                                        )
                                    } else if (key === 'currency') {
                                        // required select
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <select className="form-control" required
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)}>
                                                    {_.map(currencyList, (_item, _index) => {
                                                        return <option key={`currency-${_index}`} value={_item}>{_item}</option>
                                                    })}
                                                </select>
                                            </div>
                                        )
                                    } else if (key === 'start_date' || key === 'close_date') {
                                        // required date
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <input type="date" className="form-control" required
                                                    defaultValue={value !== "" ? new Date(value).toISOString().substr(0,10) : value}
                                                    onChange={(e) => this.handleTextChange(e, key)} />
                                            </div>
                                        )
                                    } else if (key === 'job_title' || key === 'employer' || key === 'area' || key === 'salary' || key === 'title' ||
                                        key === 'first_name' || key === 'last_name' || key === 'category' || key === 'email' || key === 'expertise') {
                                        // required input
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <input className="form-control" required
                                                    placeholder={placeholder[key]}
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)} />
                                            </div>
                                        )
                                    } else if (key === 'phone_no' || key === 'level' ){
                                        // non-required input
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <input className="form-control"
                                                    placeholder={placeholder[key]}
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)} />
                                            </div>
                                        )
                                    } else {
                                        // non-required textarea
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <textarea className="form-control"
                                                    rows='5'
                                                    placeholder={placeholder[key]}
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)}></textarea>
                                            </div>
                                        )
                                    }
                                })
                                :
                                _.map(_.pick(data, fileds), (value, key) => {
                                    return (
                                        <div key={`modal-${key}`} className='columns-merge'>
                                            <h2>{this.fieldTitle[key]}</h2>
                                            <div>{value}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            allowEdit ?
                                (showInput ?
                                    <Button type="submit"> Save </Button>
                                    : <Button onClick={this.clickEdit}> Edit </Button>)
                                : null
                        }
                        <Button>Download</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}