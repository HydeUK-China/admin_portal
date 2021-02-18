import React, { Component, useState } from 'react';
import { fetchReq } from '../../utils/utils';
import * as V from 'victory'
import '../../styles/dashboard.css';
import Axios from 'axios'
import { Bar } from 'react-chartjs-2'
import ReactGA from 'react-ga'



export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],

    }
  }


  componentDidMount() {

    let eDucation = [];
    fetchReq('/api/expertDashboard').then(data =>
      this.setState(
        { data },
        console.log(data)
      ))
      .catch(err => console.log(err));
  }




  render() {
    const { role } = this.props;
    const { data } = this.state;
    const edu = data.map(e => e.institution.toUpperCase())
    const value = data.map(v => v.value)
    ReactGA.pageview(window.location.pathname + window.location.search);

    console.log(edu)
    console.log(value)



    return (
      <div className="dashboard">
        <section className="chart-one">
          chart one
<Bar data={{
            labels: edu,
            datasets: [{
              data: value,
              label: 'Education Institution',
            }]
          }}
            options={
              {
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0
                    }
                  }]
                }
              }
            } />

          <section />

        </section>


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