import React, { Component } from 'react';
import _ from 'lodash';
import ModalOpsRow from '../components/modalOpsRow';

export default class ModalOpsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: nextProps.data
            })
        }
    }

    render() {

        const { rowLessField, rowMoreField, rowLessHeader, rowMoreHeader, modalHeader, role, onRowDelete } = this.props;
        const { data } = this.state;

        return (
            <div>
                <div className="dataheader_expert">
                    {
                        _.map(rowLessHeader, (item, index) => {
                            return <h6 key={`dataHeader-${index}`}>{item}</h6>
                        })
                    }
                </div>
                
                {
                    _.map(data, (item, index) => {
                        return <ModalOpsRow
                            role={role}
                            key={`dataRow-${index}`}
                            rowData={item}
                            rowLessField={rowLessField}
                            rowMoreField={rowLessField.concat(rowMoreField)}
                            rowMoreHeader={rowLessHeader.concat(rowMoreHeader)}
                            onRowDelete={role === '__admin__' ? onRowDelete : null}
                            modalHeader={modalHeader}
                        />
                    })
                }

            </div>

        );
    }

}