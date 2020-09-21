import React, { Component } from 'react';
import _ from 'lodash';
import DisplayExpert from './displayExpert';
import EditExpert from './editExpert'
import '../styles/database.css';


export default class ExpertTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
            showEdit: false
        }

        // this.handleToggleShow = this.handleToggleShow.bind(this)
        // this.handleToggleEdit = this.handleToggleEdit.bind(this)
        // this.handleToggleRemove = this.handleToggleRemove.bind(this)
        // this.handleToggleAdd = this.handleToggleAdd.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(e) {
        if (e.target.value === 'MoreInfo') {
            this.setState({
                showInfo: !this.showInfo,
                showEdit: this.showEdit
            })
        } else if (e.target.value === 'Edit') {
            this.setState({
                showEdit: !this.showEdit,
                showInfo: this.showInfo

            })
        }
        else if (e.target.value === 'Remove') {
            this.setState({
                showRemove: alert('Are you sure you want to remove?')
            })
        }

        else if (e.target.value === 'Close') {
            this.setState({
                showInfo: false,
                showEdit: false
            })
        }
    }


    handleToggleShow = () => {
        this.setState({
            showInfo: !this.state.showInfo
        })
    }

    // handleToggleEdit = () => {
    //     this.setState({
    //         showEdit: !this.state.showEdit
    //     })
    // }

    // handleToggleRemove = () => {
    //     alert('Remove Expert Data?')
    // }


    // handleToggleAdd = () => {
    //     this.setState({
    //         showAdd: !this.state.showAdd
    //     })
    // }

    render() {

        const { rowData, rowField, DisplayButton, EditButton, RemoveButton, role } = this.props;
        // const { showAdd } = this.state;

        return (
            <div className='database'>

                <div className="datatable_expert">
                    {_.map(_.pick(rowData, rowField), (item, index) => {
                        return <label key={`row-${index}`}>{item}</label>
                    })
                    }

                    {role === '__admin__' ? <select className='more-info-btn' onChange={this.handleSelect}>
                        <option value='MoreInfo'>More info</option>
                        <option value='Edit'>Edit</option>
                        <option value='Remove'>Remove</option>
                        <option value='Close'>Close</option>
                        {/* <option value='Add'>Add</option> */}
                    </select> : <button className='more-info-btn' onClick={this.handleToggleShow}>
                            More Info</button>}


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

                <div className={this.state.showInfo ? 'showContent content ' : 'content'} >
                    <DisplayExpert />
                </div>
                <div className={this.state.showEdit ? 'showContent content ' : 'content'} >
                    <EditExpert />


                    {/* <Add show={showAdd} /> */}
                </div>
            </div>


        );
    }

}