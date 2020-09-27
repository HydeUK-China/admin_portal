import React, { Component } from 'react';
import _ from 'lodash';
import DisplayJob from './displayJob'
import EditJob from './editJob'
import '../styles/database.css';
import DisplayExpert from './displayExpert';
import { Button, Modal } from 'react-bootstrap'



export default class MatchingJobTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
        }

        // this.handleToggleShow = this.handleToggleShow.bind(this)
        // this.handleToggleEdit = this.handleToggleEdit.bind(this)
        // this.handleToggleRemove = this.handleToggleRemove.bind(this)
        // this.handleToggleAdd = this.handleToggleAdd.bind(this)
    }



    handleToggleShow = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    }

    closeModal =() => {
        this.setState({
            showInfo: false
        })
    }

    render() {
        const { rowData, rowField, DisplayButton, EditButton, RemoveButton, children } = this.props;
        // const { showAdd } = this.state;

        return (
            <div className='database'>

                <div className="datatable_expert">
                    {_.map(_.pick(rowData, rowField), (item, index) => {
                        return <label key={`row-${index}`}>{item}</label>
                    })
                    }


                    <button className='more-info-btn' onClick={this.handleToggleShow}>
                        More Info</button>


                    {/* <button className="more-info-btn" onClick={this.handleToggleShow}>
                        {DisplayButton}
                    </button>
                    <button className="more-info-btn" onClick={this.handleToggleEdit}>
                        {EditButton}
                    </button>
                    <button className="more-info-btn" onClick={this.handleToggleRemove}>
                        {RemoveButton}
                    </button>
                    <button className="more-info-btn" onClick={this.handleToggleAdd}>
                        {AddButton}
                    </button> */}
                </div>
                <Modal show={this.state.showInfo} size='xl'>
                    <Modal.Header closeButton onHide={this.closeModal} id="contained-modal-title-vcenter">Job Matching</Modal.Header>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                </Modal>
                {/* 
                <div className={this.state.showInfo ? 'showContent content ' : 'content'} > */}

                {/* </div> */}




                {/* <Add show={showAdd} /> */}

            </div>


        );
    }

}