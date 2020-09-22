import React, { Component } from 'react';
import _ from 'lodash';
import DisplayJob from './displayJob'
import EditJob from './editJob'
import '../styles/database.css';
import DisplayExpert from './displayExpert';



export default class MatchingJobTab extends Component {
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

        const { rowData, rowField, DisplayButton, EditButton, RemoveButton, children} = this.props;
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

                <div className={this.state.showInfo ? 'showContent content ' : 'content'} >
                    {children}
                </div>

              


                    {/* <Add show={showAdd} /> */}
                    
            </div>


        );
    }

}