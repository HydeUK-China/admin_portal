import React, { Component } from 'react';

import '../../styles/dashboard.css';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  componentDidMount(){

  }

  componentWillReceiveProps(){

  }

  fetchDashboardData(){
    
  }

  render() {
    return (
      <div className="dashboard">
        <section className="chart-one"> chart one </section>

        <section className="chart-two">
          <div className="info-two-chart">chart two</div>
          <div className="info-two-chart">chart three</div>
        </section>

        <section className="chart-two">
          <div className="info-two-chart">chart four</div>
          <div className="info-two-chart">chart five</div>
        </section>

        <section className="chart-one">chart six </section>

      </div>
    )
  }
}