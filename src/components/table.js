import React, { Component } from 'react';
import _ from 'lodash';
import '../styles/table.css';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    getTHead(header) {
        return _.map(header, (item, index) => {
            return <th key={`tHeader-${index}`}><label>{item}</label></th>
        })
    }

    getTData(data) {
        if (data){
            const keys = data.length > 0 ? Object.keys(data[0]) : null;

            return _.map(data, (item, index) => {
                const row =  _.map(keys, (key, index) => {
                    return <td key={`key-${index}`}>
                                {item[key]}
                            </td>
                });

                return <tr key={`tData-${index}`}>{ row }</tr>
            })
        }     
    }

    render() {
        const props = this.props;

        return (
            <div className="database">
                <table>
                    <thead>
                        <tr>{this.getTHead(props.header)}</tr>
                    </thead>
                    <tbody>
                        {this.getTData(props.data)}
                    </tbody>
                </table>
            </div>
        )
    }
}