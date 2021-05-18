import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
import { countryList } from "../asset/countryList";
import { placeholder } from "../asset/placeholder";
import Category from "../asset/category";
import {
  expertDataLessField,
  expertDataMoreField,
} from "../asset/dataFieldHeader";
import "../styles/signup.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default class AddExpertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      education: "",
      employment: "",
      patents: "",
      publications: "",
      field_of_speciality: "",
      awards: "",
      scientific_contribution_and_research_leadership: "",
      collaborative_project_proposal: "",
    };

    this.allFields = this.createFields();

    this.createRefByField(this.allFields);

    this.closeModal = this.closeModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.ckeditorChange = this.ckeditorChange.bind(this);
  }

  createFields() {
    let fields = expertDataLessField.concat(expertDataMoreField);
    _.pullAll(fields, ["expert_id"]);
    fields.push("password");

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
          Expert Application Form
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAdd}>
            <div className="columns-add">
              <label>Title</label>
              <select
                name="title"
                className="form-control"
                required
                ref={this.title}
              >
                <option value="">Please Select</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Professor">Professor</option>
              </select>
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder.first_name}
                required
                ref={this.first_name}
              />
            </div>

            <div className="columns-add">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder.last_name}
                required
                ref={this.last_name}
              />
              <label>Nationality </label>
              <select
                name="nationality"
                className="form-control"
                required
                ref={this.nationality}
              >
                <option value="">Please Select</option>
                {_.map(countryList, (item, index) => {
                  return (
                    <option key={`country-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="columns-add">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder={placeholder.email}
                required
                ref={this.email}
              />
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="******"
                required
                ref={this.password}
              />
            </div>

            <div className="columns-add">
              <label>Expertise</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder.expertise}
                required
                ref={this.expertise}
              />
              <label>Category</label>
              <select
                name="nationality"
                className="form-control"
                required
                ref={this.category}
              >
                <option value="">Please Select</option>
                {_.map(Category, (item, index) => {
                  return (
                    <option key={`country-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="columns-add">
              <label>Phone number</label>
              <input
                type="tel"
                className="form-control"
                placeholder={placeholder.phone_no}
                ref={this.phone_no}
              />
              {/* <label>Upload CV</label>
                            <UploadFile /> */}
            </div>

            <div className="columns-add-merge">
              <h2>Education</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.education,

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
                name="education"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "education");
                }}
                ref={this.education}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Employment</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.employment,

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
                name="employment"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "employment");
                }}
                ref={this.employment}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Patents</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.patents,

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
                name="patents"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "patents");
                }}
                ref={this.patents}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Publications</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.publications,

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
                name="publications"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "publications");
                }}
                ref={this.publications}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Field of Speciality</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.field_of_speciality,

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
                name="field_of_speciality"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "field_of_speciality");
                }}
                ref={this.field_of_speciality}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Awards</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.awards,

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
                name="awards"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "awards");
                }}
                ref={this.awards}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Scientific Contribution And Research Leadership</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder:
                    placeholder.scientific_contribution_and_research_leadership,

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
                name="scientific_contribution_and_research_leadership"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(
                    data,
                    "scientific_contribution_and_research_leadership"
                  );
                }}
                ref={this.scientific_contribution_and_research_leadership}
              />
            </div>

            <div className="columns-add-merge">
              <h2>Collaborative Project Proposal</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  placeholder: placeholder.collaborative_project_proposal,

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
                name="collaborative_project_proposal"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.ckeditorChange(data, "collaborative_project_proposal");
                }}
                ref={this.collaborative_project_proposal}
              />
            </div>
            <Button type="submit" className="apply-btn">
              Add User
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
