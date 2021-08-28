import React, { useEffect, useState, useRef } from "react";
import { fetchReq } from "../../utils/utils";
import "../../styles/dashboard.css";
import _ from "lodash";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import ReactGA from "react-ga";

const Dashboard = () => {
  const barRef = useRef();
  const [totalApplicant, setTotalApplicant] = useState([]);
  const [gender, setGender] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [category, setCategory] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [sourceref, setSourceref] = useState([]);
  const [gender_val, setGender_val] = useState([]);
  const [category_val, setCategory_val] = useState([]);
  const [expertise_val, setExpertise_val] = useState([]);
  const [nationality_val, setNationality_val] = useState([]);
  const [sourceref_val, setSourceref_val] = useState([]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    Promise.all([
      fetchReq("/api/expertDashboard/totalapplicant"),
      fetchReq("/api/expertDashboard/gender"),
      fetchReq("/api/expertDashboard/category"),
      fetchReq("/api/expertDashboard/expertise"),
      fetchReq("/api/expertDashboard/nationality"),
      fetchReq("/api/expertDashboard/sourceref"),
    ])
      .then((data) => {
        const [
          totalApplicant,
          gender,
          category,
          expertise,
          nationality,
          sourceref,
        ] = data;
        setTotalApplicant(totalApplicant.map((ta) => ta.total_applicant));
        setGender(gender.map((g) => g.gender));
        setGender_val(gender.map((g) => g.number_applicant));
        setCategory(category.map((c) => c.category));
        setCategory_val(category.map((cv) => cv.number_applicant));
        setExpertise(expertise.map((e) => e.expertise));
        setExpertise_val(expertise.map((ev) => ev.number_applicant));
        setNationality(nationality.map((n) => n.nationality));
        setNationality_val(nationality.map((nv) => nv.number_applicant));
        setSourceref(sourceref.map((s) => s.source_references));
        setSourceref_val(sourceref.map((sv) => sv.number_references));

        let nat = nationality.map((n) =>
          n.nationality === "" || n.nationality === null
            ? "France"
            : n.nationality
        );
        let nat_val = nationality.map((nv) => nv.number_applicant);

        var index = 11;
        if (nat_val.length >= 10) {
          var interval = setInterval(function () {
            if (nat_val.length === index ) {
              index = 0;
            } else {
              if(!barRef.current) {
                clearInterval(interval);
              } else {
                const chart = barRef.current.chartInstance;
                function addData(chart) {
                  chart.data.datasets[0].data.shift();
                  chart.data.labels.shift();
                  chart.data.labels.push(nat[index]);
                  chart.data.datasets[0].data.push(nat_val[index]);
                  chart.update();
                  index++;
                }
                addData(chart);
              }
            }
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const dataChart = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(250,174,50,1)");
    gradient.addColorStop(1, "rgba(250,174,50,0)");
    // console.log('nationality',nationality);
    // console.log('nationality_val', nationality_val);
    let labels;
    let data;

    if (nationality.length > 10) {
      labels = _.dropRight(nationality, nationality.length - 10);
      data = _.dropRight(nationality_val, nationality_val.length - 10);
    } else {
      labels = nationality;
      data = nationality_val;
    }
    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient, // Put the gradient here as a fill color
          borderColor: "#ff6c23",
          borderWidth: 2,
          pointColor: "#fff",
          pointStrokeColor: "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",
          data: data,
        },
      ],
    };
  };
  return (
    <div className="dashboard">
      <section className="chart-one">
        <div className="number_chart">
          <h3>Total Applicant</h3>
          <hr />
          <div className="no_font">{totalApplicant}</div>
        </div>

        <div className="gender_chart">
          <Pie
            data={{
              labels: gender,
              datasets: [
                {
                  data: gender_val,
                  label: "Gender",
                  backgroundColor: ["blue", "red"],
                  borderWidth: 4,
                  borderColor: "#777",
                  hoverBorderWidth: 3,
                  hoverBorderColor: "#000",
                },
              ],
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
              responsive: true,
              title: {
                display: true,
                text: "Gender",
                fontSize: 25,
              },
              legend: {
                display: false,
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="nationality_chart">
          <Bar
            ref={barRef}
            id="bar-chart"
            data={dataChart}
            options={{
              indexAxis: 'y',
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: 100,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      callback: function (value) {
                        if (value && value.length > 4) {
                          return value.substr(0, 2)  //truncate
                        }  else {
                          return value.substr(0, 2);
                        }
                      },
                      fontSize: 10,
                      padding: 5,
                      autoSkip:true,
                      maxRotation: 0,
                      minRotation: 0,
                      // maxTicksLimit: 2
                    },
                  },
                ],
              },
              responsive: true,
              title: {
                display: true,
                text: "Nationality",
                fontSize: 25,
              },
              legend: {
                display: false,
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
        
      </section>

      {/* <section className="chart-two">
        <div className="category_chart" >
          
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
                title: {
                  display: true,
                  text: 'Category',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                responsive: false,
                maintainAspectRatio:false

              }
            }
            height={400}
            width={450}
          />
        </div>


        <div className="expertise_chart">
          <Doughnut data={{
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
                // scales: {
                //   yAxes: [{
                //     ticks: {
                //       beginAtZero: true
                //     }
                //   }]
                // },
                responsive: true,
                title: {
                  display: true,
                  text: 'Expertise',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                maintainAspectRatio:false
              }
            }
            height={400}
            width={450}
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
                responsive: true,
                title: {
                  display: true,
                  text: 'Source Referrences',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                maintainAspectRatio:false
              }
            }
            height={480}
            width={600}
          />
        </div>
      </section> */}

    </div>
  );
};

export default Dashboard;