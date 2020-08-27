import React, { Component } from 'react';
import Search from '../../components/search';
import Table from '../../components/table';
import {fetchReq} from '../../utils/utils';

import '../../styles/project_proposal.css';

export default class ProjectPorposal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null
      }

      this.header = ['Project ID', 'Project Area', 'Proposal', 'Project Place', 
      'Person in Charge', 'Applicant ID', 'Status']
    }

    componentDidMount(){
      fetchReq('/api/fetchProject').then(data => 
        this.setState(
          { data }
        ))
    }
    
    render() {
      const state = this.state;

      return (
        <div>
          <Search text="Project Proposal ID Search" placeholder="PJ-"/>
          <Table header={this.header} data={state.data}/>
        </div>
      )
    }
  }