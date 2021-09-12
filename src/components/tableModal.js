import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";


const TableModal = (props) => {
    const [show, setShow] = useState(props.show);
    const [tableData, setTableData] = useState(props.tableData);

    const tableFieldTitle = _.zipObject(props.rowField, props.rowHeader);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    useEffect(() => {
        setTableData(props.tableData);
    }, [props.tableData]);

    const closeModal = () => {
        const { onClose } = props;
        setShow(false);
        onClose(false);
    }

    const generatePDF = () => {
        const doc = new jsPDF();

        let finalY = doc.lastAutoTable.finalY;

        const firstTableHead = ['Expert Id', 'Title', 'First Name', 'Last Name', 'Gender', 'Nationality'];
        const firstTableBody = [tableData[0].expert_id, tableData[0].expert_id.title, tableData[0].first_name, tableData[0].last_name, tableData[0].gender, tableData[0].nationality];

        const secondTableHead = ['Date of Birth', 'Email', 'Phone No', 'Expertise', 'Category', 'Education organization'];
        const secondTableBody = [tableData[0].date_of_birth, tableData[0].email, tableData[0].phone_no, tableData[0].expertise, tableData[0].category, tableData[0].edu_organization];
        
        autoTable(doc, {
            theme: "grid",
            styles: { overflow: "linebreak", textColor: [0, 0, 0] },
            margin: { top: 5, bottom: 0, left: 10, right: 10 },
            columnStyles: { halign: "center" },
            head: [firstTableHead],
            body: [firstTableBody],
            didParseCell: function (hookData) {
              if (
                hookData.cell.raw === "Expert Id" ||
                hookData.cell.raw === "Title" ||
                hookData.cell.raw === "First Name" ||
                hookData.cell.raw === "Last Name" ||
                hookData.cell.raw === "Gender" ||
                hookData.cell.raw === "Nationality"
              ) {
                hookData.cell.styles.fillColor = [220, 220, 220];
              }
            },
          });

          autoTable(doc, {
            theme: "grid",
            styles: { overflow: "linebreak", textColor: [0, 0, 0] },
            margin: { top: finalY + 15, bottom: 0, left: 10, right: 10 },
            columnStyles: { halign: "center" },
            head: [secondTableHead],
            body: [secondTableBody],
            didParseCell: function (hookData) {
              if (
                hookData.cell.raw === "Date of Birth" ||
                hookData.cell.raw === "Email" ||
                hookData.cell.raw === "Phone No" ||
                hookData.cell.raw === "Expertise" ||
                hookData.cell.raw === "Category" ||
                hookData.cell.raw === "Education organization" ||
                hookData.cell.raw === "Email" ||
                hookData.cell.raw === "Phone Number"
              ) {
                hookData.cell.styles.fillColor = [248, 248, 255];
              }
            },
          });

          doc.save('pdfDOC');
    }

    return (
        <Modal show={show} onHide={closeModal} size='xl'>
            <Modal.Header closeButton onHide={closeModal}>Job Matching</Modal.Header>
            <Modal.Body>
                <div id='htopdf' className="dataheader_expert">
                    {
                        tableData && tableData[0] ?
                            _.map(_.pick(tableFieldTitle, _.keys(tableData[0])), (value, key) => {
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
                                        _.map(_.pick(item, props.rowField), (_value, _key) => {
                                            return <label key={`row-${_key}`}>{_value}</label>
                                        })

                                    }
                                    <button onClick={() => generatePDF(index)} className='more-info-btn'>Download</button>
                                </div>
                            </div>
                        )
                    })
                }
            </Modal.Body>
        </Modal>
    );
}

export default TableModal;