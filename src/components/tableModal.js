import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';

export default class TableModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            tableData: props.tableData
        }

        this.tableFieldTitle = _.zipObject(props.rowField, props.rowHeader);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                show: nextProps.show,
                tableData: nextProps.tableData
            })
        }
    }

    closeModal = () => {
        const { onClose } = this.props;

        this.setState({
            show: false
        }, () => onClose(this.state.show));
    }

    generatePDF = (e) => {
          const labels = [];
          const contents = [];
          var pdf = new jsPDF('p', 'pt');
          var data_1 = document.getElementById("htopdf")
          var recordId = e.target.value
          const {tableData} = this.state
          const {rowField} = this.props

          for(let k = 0; k <rowField.length; k++){
            contents.push(tableData[recordId][rowField[k]])
          }
          for(let i = 0; i < data_1.children.length; i++){
                labels.push(data_1.children[i].innerText);
            }
          var content = [];
          for (let j = 0; j < labels.length; j++){
            content.push(labels[j] + ':' + contents[j] + '\n');
          }
          pdf.text(content, 40, 40)
          var fileName = contents[2] + contents[3] + '.pdf'
          pdf.save(fileName)
    }

    render() {
        const { rowHeader, rowField } = this.props;
        const { tableData, show } = this.state;

        return (
            <Modal show={show} onHide={this.closeModal} size='xl'>
                <Modal.Header closeButton onHide={this.closeModal}>Job Matching</Modal.Header>
                <Modal.Body>
                    <div id='htopdf' className="dataheader_expert">
                        {
                            tableData && tableData[0] ?
                                _.map(_.pick(this.tableFieldTitle, _.keys(tableData[0])), (value, key) => {
                                    return <h6 key={`dataHeader-${key}`}>{value}</h6>
                                })
                                : null
                        }
                    </div>

                    {
                        _.map(tableData, (item, index) => {
                            return (
                                <div key={`tableModalRow-${index}`} className='database'>
                                    <div id='HtoPdf' className="datatable_expert">
                                        {
                                            _.map(_.pick(item, rowField), (_value, _key) => {
                                                return <label key={`row-${_key}`}>{_value}</label>
                                            })

                                        }
                                    <button value={`${index}`} onClick={e => this.generatePDF(e, "value")} className='more-info-btn'>Download</button>
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