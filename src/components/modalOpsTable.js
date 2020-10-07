import React, { Component } from 'react';
import _ from 'lodash';
import ModalOpsRow from '../components/modalOpsRow';

export default class ModalOpsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            sortKey: props.sortKey
        }

        this.lessFieldTitle = _.zipObject(props.rowLessField, props.rowLessHeader);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                data: nextProps.data,
                sortKey: nextProps.sortKey
            })
        }
    }

    render() {

        const { useClass, dataIdentifier, rowLessField, rowMoreField, rowLessHeader, rowMoreHeader, modalHeader, role, onRowDelete, onEditConfirm, onSortTable } = this.props;
        const { data, sortKey } = this.state;

        return (
            <div className='table-box'>
                <div className={`dataheader_${useClass}`}>
                    {
                        data && data[0] ?
                            _.map(_.pick(this.lessFieldTitle, _.keys(data[0])), (value, key) => {
                                return <h6 key={`dataHeader-${key}`} className="dataheader-title" onClick={() => onSortTable(key)}>
                                    <span>{value}</span>
                                    {sortKey === key ? <i className="fa fa-sort-asc" aria-hidden="true"></i> : null}
                                </h6>
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