import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
import { currencyList } from "../asset/currencyList";
import { jobTypeList } from "../asset/jobTypeList";
import { distanceList } from "../asset/distanceList";
import { placeholder } from "../asset/placeholder";
import Category from "../asset/category";
import {
  projectDataLessField,
  projectDataMoreField,
} from "../asset/dataFieldHeader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class AddExpertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      organization_info: "",
      professional_field: "",
      job_description: "",
      required_expertise: "",
      responsibility: "",
      essential_skills: "",
    };

    this.allFields = this.createFields();

    this.createRefByField(this.allFields);

    this.closeModal = this.closeModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  createFields() {
    let fields = projectDataLessField.concat(projectDataMoreField);
    _.pullAll(fields, ["project_id"]);

    return fields;
  }

  createRefByField(field) {
    _.forEach(field, (item, index) => {
      this[item] = React.createRef();
    });
  }

  handleAdd(e) {
    e.preventDefault();

    const { onAdd } = this.props;
    let obj = {};

    _.forEach(this.allFields, (item) => {
      if (this[item].current?.props && this[item].current?.props.name) {
        let name = this[item].current?.props.name;
        let value = this.state[name];
        obj[item] = value;
      } else if (this[item].current) {
        obj[item] = this[item].current.value;
      } else {
        obj[item] = "";
      }
    });
    onAdd(obj);
  }

  ckeditorChange(data, name) {
    this.setState({ [name]: data });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        show: nextProps.show,
      });
    }
  }

  closeModal() {
    const { close } = this.props;

    this.setState(
      {
        show: false,
      },
      () => {
        close(this.state.show);
      }
    );
  }

  render() {
    const { show } = this.state;

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={this.closeModal}
      >
        <Modal.Header
          closeButton
          onHide={this.closeModal}
          id="contained-modal-title-vcenter"
        >
          Job Posting
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAdd}>
            <div className="columns-add">
              <label>Job Title</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder.job_title}
                required
                ref={this.job_title}
              />

              <label>Job Type</label>
              <select
                name="job_type"
                className="form-control"
                defaultValue="full time"
                required
                ref={this.job_type}
              >
                {_.map(jobTypeList, (item, index) => {
                  return (
                    <option key={`job_type-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="columns-add">
              <label>Employer</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder.employer}
                required
                ref={this.employer}
              />

              <label>Show Employer Name</label>
              <select
                name="show_employer_name"
                className="form-control"
                defaultValue="Y"
                required
                ref={this.show_employer_name}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div className="columns-add">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                required
                ref={this.start_date}
              />
              <label>Close Date</label>
              <input
                type="date"
                className="form-control"
                required
                ref={this.close_date}
              />
            </div>
            <div className="columns-add">
              <label>Category</label>
              <select
                className="form-control"
                defaultValue="remote"
                required
                ref={this.category}
              >
                {_.map(Category, (item, index) => {
                  return (
                    <option key={`distance-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="columns-add">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder.location}
                required
                ref={this.location}
              />
              <label>Distance</label>
              <select
                className="form-control"
                defaultValue="remote"
                required
                ref={this.distance}
              >
                {_.map(distanceList, (item, index) => {
                  return (
                    <option key={`distance-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="columns-add">
              <label>Salary</label>
              <select
                name="currencylist"
                className="form-control"
                defaultValue="GBP"
                required
                ref={this.currency}
              >
                {_.map(currencyList, (item, index) => {
                  return (
                    <option key={`currency-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="35,000 - 45,000"
                required
                ref={this.salary}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Organization Infomation</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.organization_info,

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
                data=""
                name="organization_info"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "organization_info");
                }}
                ref={this.organization_info}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Professional Field</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.professional_field,

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
                data=""
                name="professional_field"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "professional_field");
                }}
                ref={this.professional_field}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Job Description</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.job_description,

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
                data=""
                name="professional_field"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "job_description");
                }}
                ref={this.job_description}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Required Expertise</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.required_expertise,

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
                data=""
                name="required_expertise"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "required_expertise");
                }}
                ref={this.required_expertise}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Responsibilities</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.responsibility,

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
                data=""
                name="responsibility"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "responsibility");
                }}
                ref={this.responsibility}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Essential skills</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.essential_skills,

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
                data=""
                name="essential_skills"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "essential_skills");
                }}
                ref={this.essential_skills}
              />
            </div>
            <Button className="apply-btn" type="submit">
              Add Job
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
