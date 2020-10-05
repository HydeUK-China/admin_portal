import React, { Component } from 'react';
import _ from 'lodash';
import ModalOpsRow from '../components/modalOpsRow';

export default class ModalOpsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }

        this.lessFieldTitle = _.zipObject(props.rowLessField, props.rowLessHeader);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: nextProps.data
            })
        }
    }

    render() {

        const { useClass, dataIdentifier, rowLessField, rowMoreField, rowLessHeader, rowMoreHeader, modalHeader, role, onRowDelete, onEditConfirm } = this.props;
        const { data } = this.state;

        return (
            <div className='table-box'>
                <div className={`dataheader_${useClass}`}>
                    {
                        data && data[0] ?
                            _.map(_.pick(this.lessFieldTitle, _.keys(data[0])), (value, key) => {
                                return <h6 key={`dataHeader-${key}`}>{value}</h6>
                            })
                            : null
                    }
                </div>

                {
                    _.map(data, (item, index) => {
                        return <ModalOpsRow
                            useClass={useClass}
                            role={role}
                            key={`dataRow-${index}`}
                            rowData={item}
                            dataIdentifier={dataIdentifier}
                            rowLessField={rowLessField}
                            rowMoreField={rowLessField.concat(rowMoreField)}
                            rowMoreHeader={rowLessHeader.concat(rowMoreHeader)}
                            onRowDelete={role === '__admin__' ? onRowDelete : null}
                            onEditConfirm={role === '__admin__' ? onEditConfirm : null}
                            modalHeader={modalHeader}
                        />
                    })
                }

            </div>
        );
    }

}