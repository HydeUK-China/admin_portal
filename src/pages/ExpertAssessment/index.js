import React, { Component } from 'react';
import Search from '../../components/search';
import Table from '../../components/table';
import {fetchReq} from '../../utils/utils';

import '../../styles/expert_assessment.css';


export default class ExpertAssessment extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null
      }

      this.header = ['Applicant ID', 'First Name', 'Last Name', '手动评级 (A)', 
      'Grade']
    }

    componentDidMount(){
      fetchReq('/api/fetchAssessment').then(data => 
        this.setState(
          { data }
        ))
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