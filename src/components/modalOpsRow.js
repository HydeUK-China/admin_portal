import React, { Component } from "react";
import _ from "lodash";
import InfoEditModal from "./infoEditModal";
import ConfirmDeleteModal from "./confirmDeleteModal";
import { Button, Modal } from "react-bootstrap";

export default class ModalOpsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: false,
      selOption: "",
      data: props.rowData,
      showModal: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        data: nextProps.rowData,
      });
    }
  }

  handleSelect(e) {
    if (e.target.value === "moreinfo") {
      this.setState({
        showInfo: !this.showInfo,
      });
    } else if (e.target.value === "delete") {
      this.setState({ showModal: true });
    }
  }

  closeInfoHandler = (hide) => {
    this.setState({
      showInfo: hide,
    });
  };

  handleDataChange = (data) => {
    this.setState({
      data,
    });
  };
  handleClose() {
    this.setState({ showModal: false });
  }
  confirmDelete() {
    const { onRowDelete, dataIdentifier } = this.props;
    const { data } = this.state;
    const id = data[dataIdentifier];

    onRowDelete(id);
    this.setState({ showModal: false });
  }

  render() {
    const {
      useClass,
      rowLessField,
      rowMoreField,
      rowMoreHeader,
      modalHeader,
      role,
      onEditConfirm,
    } = this.props;
    const { data, selOption, showInfo } = this.state;

    return (
      <div className="database">
        <div className={`datatable_${useClass}`}>
          {_.map(_.pick(data, rowLessField), (value, key) => {
            return <label key={`row-${key}`}>{value}</label>;
          })}

          {role === "__admin__" ? (
            <select
              className="more-info-btn"
              value={selOption}
              onChange={this.handleSelect}
            >
              <option value="">Please Select</option>
              <option value="moreinfo">More info</option>
              <option value="delete">Delete</option>
            </select>
          ) : (
            <select
              className="more-info-btn"
              value={selOption}
              onChange={this.handleSelect}
            >
              <option value="">Please Select</option>
              <option value="moreinfo">More info</option>
            </select>
          )}
        </div>
        <ConfirmDeleteModal
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          confirmDelete={this.confirmDelete}
        />
        <InfoEditModal
          show={showInfo}
          close={this.closeInfoHandler}
          allowEdit={role === "__admin__" ? true : false}
          onDataChange={role === "__admin__" ? this.handleDataChange : null}
          onEditConfirm={role === "__admin__" ? onEditConfirm : null}
          modalHeader={modalHeader}
          headers={rowMoreHeader}
          fileds={rowMoreField}
          data={data}
        />
      </div>
    );
  }
}
