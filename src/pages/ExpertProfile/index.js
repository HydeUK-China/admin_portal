import React, { Component } from "react";
import _ from "lodash";
import ExpertRightSidebar from "../../components/expertRightSidebar";
import { fetchReq } from "../../utils/utils";
import { placeholder } from "../../asset/placeholder";
import ReactGA from "react-ga";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class ExpertProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      applicationComplete: null,
      showInput: false,
      editbutton: "Edit",
      savebutton: "Save",
    };

    this.lessField = [
      "expert_id",
      "title",
      "first_name",
      "nationality",
      "expertise",
      "email",
      "phone_no",
      "linkedin",
      "skype",
      "twitter",
    ];
    this.moreHeader = [
      "Education",
      "Employment",
      "Field of Speciality",
      "Patents",
      "Publications",
      "Awards",
      "Scientific Contribution And Research Leadership",
      "Collaborative Project Proposal",
    ];
    this.moreField = [
      "education",
      "employment",
      "field_of_speciality",
      "patents",
      "publications",
      "awards",
      "scientific_contribution_and_research_leadership",
      "collaborative_project_proposal",
    ];

    this.expertId = props.uid;
    this.requiredFields = ["education", "employment", "field_of_speciality"];
    this.fieldTitle = _.zipObject(this.moreField, this.moreHeader);

    this.confirmHandler = this.confirmHandler.bind(this);
  }

  componentDidMount() {
    const url = `/api/fetchExpert/${this.expertId}`;
    fetchReq(url)
      .then((data) => {
        this.setState({
          data,
        });

        const _url = `/api/fetchExpertProject/${this.expertId}`;
        fetchReq(_url)
          .then((data) => {
            if (data[0]) {
              const applicationComplete = data[0].application_complete;
              this.setState({
                applicationComplete,
              });
              const { completeAppMsger } = this.props;
              completeAppMsger(applicationComplete);
            } else {
              const applicationComplete = "N";
              this.setState({
                applicationComplete,
              });
              const { completeAppMsger } = this.props;
              completeAppMsger(applicationComplete);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(err));
  }

  handleTextChange(e, key, dataCk) {
    const { data } = this.state;

    let tmp_data;
    if(dataCk || dataCk === '') {
         tmp_data = Object.assign(data, {
            [key]: dataCk,
        });

    } else {
        tmp_data = Object.assign(data, {
            [key] : e.target.value
        })
    }
    this.setState({
      data: tmp_data,
    });
  }

  editHandler = (showInput) => {
    this.setState(showInput);
  };

  confirmHandler = (sidebarData) => {
    const { data } = this.state;
    const { completeAppMsger } = this.props;

    const tmp_data = Object.assign(data, {
      ...sidebarData,
    });

    let condition = true;
    _.forEach(this.requiredFields, (key) => {
      condition = condition && tmp_data[key];
    });

    if (condition) {
      fetchReq("/api/editExpert", {
        body: JSON.stringify({
          record: tmp_data,
        }),
      })
        .then((feedback) => {
          const url = `/api/completeExpertApplication/${this.expertId}`;
          fetchReq(url)
            .then((feedback) => {
              this.setState(
                {
                  data: tmp_data,
                  showInput: false,
                  applicationComplete: "Y",
                },
                () => completeAppMsger("Y")
              );
            })
            .catch((err) => alert(err));
        })
        .catch((err) => alert(err));
    } else {
      alert("please fill in required fields");
    }
  };

  render() {
    const { showInput, data, applicationComplete } = this.state;
    ReactGA.pageview(window.location.pathname + window.location.search);
    return (
      <div>
        <div className="profile">
          {showInput
            ? _.map(_.pick(data, this.moreField), (value, key) => {
                return (
                  <div key={`expertinfo-${key}`}>
                    <h3 className="label-tag">
                      {this.fieldTitle[key]} &nbsp;
                      {this.requiredFields.indexOf(key) !== -1 ? (
                        !value && applicationComplete === "N" ? (
                          <span className="warning-text">
                            * please fill this field to complete application
                          </span>
                        ) : (
                          <span className="warning-text">*</span>
                        )
                      ) : null}
                    </h3>
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
                      required={this.requiredFields.indexOf(key) !== -1 ? true : false}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.handleTextChange(event, key, data);
                      }}
                    />
                  </div>
                );
              })
            : _.map(_.pick(data, this.moreField), (value, key) => {
                return (
                  <div key={`expertinfo-${key}`}>
                    <h3 className="label-tag">
                      {this.fieldTitle[key]} &nbsp;
                      {this.requiredFields.indexOf(key) !== -1 ? (
                        !value && applicationComplete === "N" ? (
                          <span className="warning-text">
                            * please fill this field to complete application
                          </span>
                        ) : (
                          <span className="warning-text">*</span>
                        )
                      ) : null}
                    </h3>
                    <section className="profile-content"><div dangerouslySetInnerHTML={{ __html: value }} /></section>
                  </div>
                );
              })}
        </div>

        <ExpertRightSidebar
          data={_.pick(data, this.lessField)}
          showInput={showInput}
          handleInputChange={(e, key) => this.handleTextChange(e, key)}
          handleEdit={this.editHandler}
          handleConfirm={this.confirmHandler}
        />
      </div>
    );
  }
}
