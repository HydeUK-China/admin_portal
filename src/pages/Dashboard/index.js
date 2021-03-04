import React, { Component, useState } from 'react';
import { fetchReq } from '../../utils/utils';
import '../../styles/dashboard.css';
import { Bar, Pie } from 'react-chartjs-2'
import ReactGA from 'react-ga'



export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalApplicant: [],
      gender: [],
      expertise: [],
      category: [],
      nationality: [],
      sourceref: []

    }
  }


  // componentDidMount() {
  //   fetchReq('/api/expertDashboard').then(data =>
  //     this.setState(
  //       { data },
  //       console.log(data)
  //     ))
  //     .catch(err => console.log(err));
  // }

  componentDidMount() {
    Promise.all([
      fetchReq('/api/expertDashboard/totalapplicant'),
      fetchReq('/api/expertDashboard/gender'),
      fetchReq('/api/expertDashboard/category'),
      fetchReq('/api/expertDashboard/expertise'),
      fetchReq('/api/expertDashboard/nationality'),
      fetchReq('/api/expertDashboard/sourceref')
    ]).then(data => {
      const [totalApplicant, gender, category, expertise, nationality, sourceref] = data;
      this.setState({ totalApplicant, gender, category, expertise, nationality, sourceref })

    }).catch(err => console.log(err))
  }






  render() {
    const { role } = this.props;
    const { data } = this.state;
    const totalApplicant = this.state.totalApplicant.map(ta => ta.total_applicant)
    const gender = this.state.gender.map(g => g.gender)
    const gender_val = this.state.gender.map(g => g.number_applicant)
    const category = this.state.category.map(c => c.category)
    const category_val = this.state.category.map(cv => cv.number_applicant)
    const expertise = this.state.expertise.map(e => e.expertise)
    const expertise_val = this.state.expertise.map(ev => ev.number_applicant)
    const nationality = this.state.nationality.map(n => n.nationality)
    const nationality_val = this.state.nationality.map(nv => nv.number_applicant)
    const sourceref = this.state.sourceref.map(s => s.source_references)
    const sourceref_val = this.state.sourceref.map(sv => sv.number_references)

    // console.log(totalApplicant)
    // console.log(gender)
    // console.log(gender_val)
    // console.log(category)
    // console.log(category_val)
    // console.log(expertise)
    // console.log(expertise_val)
    // console.log(nationality)
    // console.log(nationality_val)
    // console.log(sourceref)
    // console.log(sourceref_val)

    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <div className="dashboard">
        <section className="chart-one">
          <div className='number_chart'>
            <h3>Total Applicant</h3>
            <hr />
            <div className='no_font'>{totalApplicant}</div>
          </div>

          <div className='gender_chart'>
            <Pie
              data={{
                labels: gender,
                datasets: [{
                  data: gender_val,
                  label: 'Gender',
                  backgroundColor: ['blue', 'red'],
                  borderWidth: 4,
                  borderColor: '#777',
                  hoverBorderWidth: 3,
                  hoverBorderColor: '#000'
                }]
              }}
              options={{
                // {
                //   scales: {
                //     yAxes: [{
                //       ticks: {
                //         min: 0
                //       }
                //     }]
                //   },
                responsive: false,
                title: {
                  display: true,
                  text: 'Gender',
                  fontSize: 25
                },
                legend: {
                  display: false,
                }
              }}
              
            />
          </div>


          <div className='nationality_chart'>

            <Bar data={{
              labels: nationality,
              datasets: [{
                data: nationality_val,
                label: 'Nationality',
                // backgroundColor: ['blue', 'red'],
                borderWidth: 4,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
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
                  },
                  responsive: false,
                  title: {
                    display: true,
                    text: 'Nationality',
                    fontSize: 25
                  },
                  legend: {
                    display: false,

                  }
                }
              }
            />
          </div>


        </section>


        <section className="chart-two">
          <div className="category_chart">
            <Pie data={{
              labels: category,
              datasets: [{
                data: category_val,
                label: 'Category',
                // backgroundColor: ['blue', 'red'],
                borderWidth: 4,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
              }]
            }}
              options={
                {
                  // scales: {
                  //   yAxes: [{
                  //     ticks: {
                  //       beginAtZero: true
                  //     }
                  //   }]
                  // },
                  responsive: false,
                  title: {
                    display: true,
                    text: 'Category',
                    fontSize: 25
                  },
                  legend: {
                    display: false,

                  }
                }
              }
            />
          </div>


          <div className="expertise_chart">
            <Bar data={{
              labels: expertise,
              datasets: [{
                data: expertise_val,
                label: 'Expertise',
                // backgroundColor: ['blue', 'red'],
                borderWidth: 4,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
              }]
            }}
              options={
                {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  },
                  responsive: false,
                  title: {
                    display: true,
                    text: 'Expertise',
                    fontSize: 25
                  },
                  legend: {
                    display: false,

                  }
                }
              }
            />

          </div>
        </section>

        <section className="chart-two">
          <div className="source_chart">
            <Bar data={{
              labels: sourceref,
              datasets: [{
                data: sourceref_val,
                label: 'Source references',
                // backgroundColor: ['blue', 'red'],
                borderWidth: 4,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
              }]
            }}
              options={
                {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  },
                  responsive: false,
                  title: {
                    display: true,
                    text: 'Source Referrences',
                    fontSize: 25
                  },
                  legend: {
                    display: false,

                  }
                }
              }
            />
          </div>
        </section>


      </div>
    )
  }
}