import React, { Component } from 'react';
import Search from '../../components/search';
import Table from '../../components/table';
import {fetchReq} from '../../utils/utils';

import '../../styles/expert_database.css';

export default class ExpertDatabase extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null
      }

      this.header = ['Applicant ID', 'First Name', 'Last Name', 'Email', 
      'Tel', 'D.O.B', 'Nationality', 'Expertise', 'Professional Field', 'CV']
    }

    componentDidMount(){
      fetchReq('/api/fetchExpert').then(data => 
        this.setState(
          { data }
        ))
        .catch( err =>  console.log(err) );
    }
    
    render() {
      const state = this.state;

      return (
        <div>
          <Search text="EP ID Search" placeholder="EP-"/>
          <Table header={this.header} data={state.data}/>
        </div>
      )
    }
  }