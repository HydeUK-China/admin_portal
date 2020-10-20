import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { isValidDate } from '../utils/utils';
import { currencyList } from '../asset/currencyList';
import { countryList } from '../asset/countryList';
import { jobTypeList } from '../asset/jobTypeList';
import { distanceList } from '../asset/distanceList';
import { placeholder } from '../asset/placeholder';
import jsPDF from 'jspdf';

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

        const { onEditConfirm } = this.props;
        const { data } = this.state;

        this.setState({
            showInput: !this.state.showInput
        }, () => {
            onEditConfirm(data);
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

    generatePDF = () => {
        const { fileds } = this.props;
        const { data } = this.state;

        const contents = [];
        const pdf = new jsPDF('p', 'pt');
        const fieldTitle = this.fieldTitle;

        _.forEach(fileds, (key) => {
            contents.push(fieldTitle[key] + ': ' + data[key] || '')
        })

        var sourcePDF = "../src/template.pdf";

        // const { fileds } = this.props;
        // const { data }  = this.state;

        // const contents = [];
        // const labals = [];
        // const modContents = [];
        // // const pdf = new jsPDF('p', 'pt','letter');
        // const pdf = new jsPDF('../src/template.pdf')
        // const fieldTitle = this.fieldTitle;

        // const content = pdf.output();
        // console.log(content)
        
        // _.forEach(fileds, (key) => {
        //     contents.push(data[key]);
        //     labals.push(fieldTitle[key]);    
        //     // modContents.push('<b>' + fieldTitle[key] + '</b>' + '<p>' + data[key] + '</p>');  
        //     modContents.push(fieldTitle[key] + ": " + data[key] + '\n')
        // })
        // console.log(modContents)
        // pdf.addFont('ArialMS', 'Arial', 'normal');
        // pdf.setFont('Arial'); 
        // pdf.setFontSize(12);
        // pdf.text(25, 25, labals);
        // pdf.setFontSize(20);
        // pdf.text(20, 35, modContents);
        // const fileName = data[fileds[2]] + ' ' + data[fileds[3]] + '.pdf'
        // pdf.autoPrint();
        // var oHiddFrame = document.createElement("iframe");
        // oHiddFrame.style.position = "fixed";
        // oHiddFrame.style.visibility = "hidden";
        // oHiddFrame.src = pdf.output('bloburl');
        // document.body.appendChild(oHiddFrame);
        // pdf.save(fileName)
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
                        <div id='htmlTopdf' className='content-general-info'>
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
                                    } else if (key === 'show_employer_name') {
                                        // required select
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <select className="form-control" required
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)}>
                                                    <option value='Y'>Yes</option>
                                                    <option value='N'>No</option>
                                                </select>
                                            </div>
                                        )
                                    } else if (key === 'job_type') {
                                        // required select
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <select className="form-control" required
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)}>
                                                    {
                                                        _.map(jobTypeList, (_item, _index) => {
                                                            return <option key={`job_type-${_index}`} value={_item}>{_item}</option>
                                                        })
                                                    }
                                                </select>
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
                                                        if (_item === "") {
                                                            return <option key={`currency-${_index}`} value={_item}>Please select</option>
                                                        } else {
                                                            return <option key={`currency-${_index}`} value={_item}>{_item}</option>
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                        )
                                    } else if (key === 'nationality') {
                                        // required select
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <select className="form-control" required
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)}>
                                                    {_.map(countryList, (_item, _index) => {
                                                        if (_item === "") {
                                                            return <option key={`nationality-${_index}`} value={_item}>Please select</option>
                                                        } else {
                                                            return <option key={`nationality-${_index}`} value={_item}>{_item}</option>
                                                        }
                                                    })}
                                                </select>
                                            </div>
                                        )
                                    } else if (key === 'distance') {
                                        // required select
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <select className="form-control" required
                                                    defaultValue={value}
                                                    onChange={(e) => this.handleTextChange(e, key)}>
                                                    {_.map(distanceList, (_item, _index) => {
                                                        if (_item === "") {
                                                            return <option key={`nationality-${_index}`} value={_item}>Please select</option>
                                                        } else {
                                                            return <option key={`nationality-${_index}`} value={_item}>{_item}</option>
                                                        }
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
                                                    defaultValue={isValidDate(value) ? new Date(value).toISOString().substr(0, 10) : value}
                                                    onChange={(e) => this.handleTextChange(e, key)} />
                                            </div>
                                        )
                                    } else if (key === 'job_title' || key === 'location' || key === 'employer' || key === 'area' || key === 'salary' || key === 'title' ||
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
                                    } else if (key === 'phone_no' || key === 'level') {
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
                                    if (key === 'employer' && data.show_employer_name === 'N') {
                                        return null;
                                    } else if (key === 'show_employer_name' || key === 'application_complete' || key === 'featured') {
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <div className="newline-text">{value === 'Y' ? 'Yes' : (value === 'N' ? 'No' : value)}</div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={`modal-${key}`} className='columns-merge'>
                                                <h2>{this.fieldTitle[key]}</h2>
                                                <div className="newline-text">{value}</div>
                                            </div>
                                        )
                                    }

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
                        <Button onClick={this.generatePDF}>Download</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}