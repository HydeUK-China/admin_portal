import React, { Component } from 'react';
import _ from 'lodash';
import Search from '../../components/search';
import Table from '../../components/table';
import {fetchReq} from '../../utils/utils';

import '../../styles/expert_assessment.css';


export default class ExpertAssessment extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: []
      }

      this.header = ['Applicant ID', 'First Name', 'Last Name', '手动评级 (A)', 
      'Grade']

      this.field_name = ['applicant_id', 'First_Name', 'Last_Name', 'Manual Grade',
      'Grade']
    }

    componentDidMount(){
      fetchReq('/api/fetchAssessment').then(data => {
        return _.map(data, (item, index) => {
          let obj = {}
          _.forEach(this.field_name, (_item, _index) => {
            obj[_item] = item[_item] || ''
          })   
          return obj;
        }) 
      }).then((data) => {
        this.setState(
          { data }
        )
      }).catch( err =>  console.log(err) );
    }
    
    render() {
      const state = this.state;

      return (
        <div>
          <Search text="Grade / Score" placeholder="A / 55"/>
          <Table header={this.header} data={state.data}/>
        </div>
      )
    }
  }