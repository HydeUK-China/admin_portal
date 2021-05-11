import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class ConfirmDeleteModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want delete this?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
