import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Button, Modal } from "react-bootstrap";
import { isValidDate } from "../utils/utils";
import { currencyList } from "../asset/currencyList";
import { countryList } from "../asset/countryList";
import { jobTypeList } from "../asset/jobTypeList";
import { distanceList } from "../asset/distanceList";
import Category from "../asset/category";
import { placeholder } from "../asset/placeholder";
import jsPDF from "jspdf";
import "../styles/signup.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const InfoEditModal = (props) => {
  const [show, setShow] = useState(props.show);
  const [showInput, setShowInput] = useState(false);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const fieldTitle = _.zipObject(props.fileds, props.headers);

  const closeModal = () => {
    const { close } = props;
    setShow(false);
    close(show);
  };

  const clickEdit = (e) => {
    e.preventDefault();
    setShowInput(true);
  }

  const clickConfirm = (e) => {
    e.preventDefault();

    const { onEditConfirm } = props;
    setShowInput(!showInput);
    onEditConfirm(data)

  }

  const handleTextChange = (e, key, dataCk) => {
    const { onDataChange } = props;

    let tmp_data;
    if (dataCk || dataCk === "") {
      tmp_data = Object.assign(data, {
        [key]: dataCk,
      });
    } else {
      tmp_data = Object.assign(data, {
        [key]: e.target.value,
      });
    }
    setData(tmp_data);
    onDataChange(data);
  }

  const generatePDF = () => {
    const { fileds } = props;

    const pdf = new jsPDF("p", "in", "letter");
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 0.5;
    const size = 12;
    let curLines = [];
    let lastLine = pdf.splitTextToSize("", 7.5);
    let longStr = "";
    let verticalOffset = margin;

    let contents = [];
    

    _.forEach(fileds, (key, index) => {
      contents.push(fieldTitle[key] + ": \n" + data[key] || "");

      longStr = contents.join("\n\n");

      curLines = pdf.splitTextToSize(longStr, 7.5);
      verticalOffset = verticalOffset + ((curLines.length + 0.5) * size) / 72;

      if (verticalOffset > pageHeight) {
        if (index === fileds.length - 1) {
          pdf.text(0.5, margin + size / 72, curLines);
        } else {
          pdf.text(0.5, margin + size / 72, lastLine);

          pdf.addPage();
          verticalOffset = margin; // Restart height position
          contents = [fieldTitle[key] + ": \n" + data[key] || ""];
        }
      } else {
        if (index === fileds.length - 1) {
          pdf.text(0.5, margin + size / 72, curLines);
        } else {
          lastLine = curLines;
        }
      }
    });

    const fileName = data[fileds[2]] + " " + data[fileds[3]] + ".pdf";
    pdf.save(fileName);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={closeModal}
    >
      <Modal.Header
        closeButton
        onHide={closeModal}
        id="contained-modal-title-vcenter"
      >
        {props.modalHeader}
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={clickConfirm}>
          <div id="htmlTopdf" className="content-general-info">
            {showInput
              ? _.map(_.pick(data, props.fileds), (value, key) => {
                  if (
                    key === "id" ||
                    key === "expert_id" ||
                    key === "project_id" ||
                    key === "matching_id"
                  ) {
                    // readonly input
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          className="form-control"
                          readOnly
                          defaultValue={value}
                        />
                      </div>
                    );
                  } else if (key === "show_employer_name") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => this.handleTextChange(e, key)}
                        >
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </div>
                    );
                  } else if (key === "job_type") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(jobTypeList, (_item, _index) => {
                            return (
                              <option
                                key={`job_type-${_index}`}
                                value={_item}
                              >
                                {_item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "currency") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(currencyList, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`currency-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`currency-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "nationality") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(countryList, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "distance") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(distanceList, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "start_date" || key === "close_date") {
                    // required date
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          type="date"
                          className="form-control"
                          required
                          defaultValue={
                            isValidDate(value)
                              ? new Date(value).toISOString().substr(0, 10)
                              : value
                          }
                          onChange={(e) => handleTextChange(e, key)}
                        />
                      </div>
                    );
                  } else if (
                    key === "job_title" ||
                    key === "location" ||
                    key === "employer" ||
                    key === "area" ||
                    key === "salary" ||
                    key === "title" ||
                    key === "first_name" ||
                    key === "last_name" ||
                    key === "email" ||
                    key === "expertise"
                  ) {
                    // required input
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          className="form-control"
                          required
                          placeholder={placeholder[key]}
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        />
                      </div>
                    );
                  } else if (key === "category") {
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(Category, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "phone_no" || key === "level") {
                    // non-required input
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          className="form-control"
                          placeholder={placeholder[key]}
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        />
                      </div>
                    );
                  } else {
                    // non-required textarea
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            placeholder: placeholder[key],

                            toolbar: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "blockQuote",
                              "link",
                              "numberedList",
                              "bulletedList",
                              "|",
                              "undo",
                              "redo",
                            ],
                          }}
                          data={value}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            handleTextChange(event, key, data);
                          }}
                        />
                      </div>
                    );
                  }
                })
              : _.map(_.pick(data, props.fileds), (value, key) => {
                  // if (key === 'employer' && data.show_employer_name === 'N') {
                  //     return null;
                  // } else
                  if (
                    key === "show_employer_name" ||
                    key === "application_complete" ||
                    key === "featured"
                  ) {
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <div className="newline-text">
                          {value === "Y"
                            ? "Yes"
                            : value === "N"
                            ? "No"
                            : value}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <div className="newline-text">
                          <div dangerouslySetInnerHTML={{ __html: value }} />
                        </div>
                      </div>
                    );
                  }
                })}
          </div>
          {props.allowEdit ? (
            showInput ? (
              <Button type="submit"> Save </Button>
            ) : (
              <Button onClick={clickEdit}> Edit </Button>
            )
          ) : null}
          <Button onClick={generatePDF}>Download</Button>
          {/* window.print */}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InfoEditModal;
