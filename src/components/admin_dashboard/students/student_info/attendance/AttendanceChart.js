import { green, red } from '@mui/material/colors';
import React from 'react'
import Chart from 'react-apexcharts'


class AttendanceChart extends React.Component {
    constructor(props) {
      super(props);
      const {reportMonth, totalAbsent, totalPresent} = this.props


      this.state = {
        series: [totalPresent, totalAbsent],
        options: {
          chart: {
           
            type: 'donut',
          },
          labels: ['Present', 'Absent'],
          colors: ['#66DA26', '#E91E63'],
          border: 0,

          dataLabels: {
            enabled: true
          },
          fill: {
            type: 'gradient',
          },
          legend: {
            formatter: function(val, opts) {
              return val + " - " + opts.w.globals.series[opts.seriesIndex]
            }
          },
          title: {
            text: reportMonth,
            style: {
            fontSize:  '20px',
            fontWeight:  'bolder',
            fontFamily:  "Kanit",
            color:  'white',
            margin: 10
            },
          }
        },
      
      
      };
    }

  

    render() {
      return (
        


        <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="donut"  />
        </div>



      );
    }
  }

  export default AttendanceChart