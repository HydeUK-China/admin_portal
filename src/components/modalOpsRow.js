import React, { Component } from 'react';
import _ from 'lodash';
import InfoEditModal from './infoEditModal';

export default class ModalOpsRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
            selOption: '',
            data: props.rowData
        }

        this.handleSelect = this.handleSelect.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: nextProps.rowData
            })
        }
    }

    handleSelect(e) {
        if (e.target.value === 'moreinfo') {
            this.setState({
                showInfo: !this.showInfo
            })
        } else if (e.target.value === 'delete') {
            const { onRowDelete } = this.props;
            const { data } = this.state;
            const { id } = data;
            onRowDelete(id);
        }
    }

    closeInfoHandler = (hide) => {
        this.setState({
            showInfo: hide
        })
    }

    handleDataChange = (data) => {
        this.setState({
            data
        })
    }

    render() {

        const { rowLessField, rowMoreField, rowMoreHeader, modalHeader, role } = this.props;
        const { data, selOption, showInfo } = this.state;

        return (
            <div className='database'>
                <div className="datatable_expert">
                    {_.map(_.pick(data, rowLessField), (value, key) => {
                        return <label key={`row-${key}`}>{value}</label>
                    })
                    }

                    {
                        role === '__admin__' ?
                            <select className='more-info-btn' value={selOption} onChange={this.handleSelect}>
                                <option value=''>Please Select</option>
                                <option value='moreinfo'>More info</option>
                                <option value='delete'>Delete</option>
                            </select>
                            : <select className='more-info-btn' value={selOption} onChange={this.handleSelect}>
                                <option value=''>Please Select</option>
                                <option value='moreinfo'>More info</option>
                            </select>
                    }
                </div>

                <InfoEditModal 
                    show={showInfo}
                    close={this.closeInfoHandler}
                    allowEdit={role === '__admin__' ? true : false}
                    onDataChange={role === '__admin__' ? this.handleDataChange : null}
                    modalHeader={modalHeader}
                    headers={rowMoreHeader}
                    fileds={rowMoreField}
                    data={data}
                />

            </div>

        );
    }

}