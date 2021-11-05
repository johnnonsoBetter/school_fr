import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {DateTime} from 'luxon'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import AttendanceChart from './AttendanceChart';
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material';
import { blue, green, red } from '@mui/material/colors';
import AttendanceDate from './AttendanceDate';


const styles = {
  slideContainer: {
    height: 100,
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};



function MobileAttendanceList(props) {
    const {attendances} = props

    const monthReports = Array.from(new Set(attendances.map((att) => DateTime.fromISO(att.created_at).toLocaleString({month: 'long'}) ))) 


    function getData(month, attendances) {
       
       return attendances.filter((att) => DateTime.fromISO(att.created_at).toLocaleString({month: 'long'}) === month )

        
    }


  return (
    <SwipeableViews >
      
      {
                    monthReports.map((report) => {
                        const monthlyData = getData(report, attendances)
                        const totalAbsent = monthlyData.filter((att) => att.is_present == false).length

                        const totalPresent = monthlyData.filter((att) => att.is_present == true).length



                        return (

                              
                                    <Box key={report} p={1}>
                                        <Paper elevation={3} sx={{ minHeight: 520,  borderRadius: "10px"}} >
                                          
                                                <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{bgcolor: blue[800], borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}   minHeight={250}  >
                                                    <AttendanceChart reportMonth={report} totalPresent={totalPresent} totalAbsent={totalAbsent} />
                                                </Box>
                                           

                                            <Box p={2} >
                                                <Grid container spacing={1}  >

                                                    {
                                                        monthlyData.map((data) => {

                                                            const day = DateTime.fromISO(data.created_at).toLocaleString({day: 'numeric'})
                                                            return (
                                                                <Grid item key={data.id}  >
                                                                    <Paper >
                                                                        <AttendanceDate data={data} />

                                                                    </Paper>
                                                                
                                                                </Grid>
                                                            )

                                                        })
                                                    }
                                                    

                                            


                                                
                                                </Grid>
                                                
                                                
                                            </Box>

                                            
                                            
                                        </Paper>

                                    </Box>
                                


                        )
                    })
                }
   
    </SwipeableViews>
  );
}

export default MobileAttendanceList;
