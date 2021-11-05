import { CancelRounded, CheckCircleRounded, CloseRounded } from '@mui/icons-material'
import { Avatar, Box, createTheme, Grid, Paper, Stack, ThemeProvider, Typography } from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import React from 'react'
import AttendanceChart from './AttendanceChart'
import {DateTime} from 'luxon'
import AttendanceDate from './AttendanceDate'


const boxTheme = createTheme({
    palette: {
        primary: {
            main: blue[200]
        }
    }
})


export default function AttendanceList(props) {

    const {attendances} = props

    const monthReports = Array.from(new Set(attendances.map((att) => DateTime.fromISO(att.created_at).toLocaleString({month: 'long'}) ))) 


    function getData(month, attendances) {
       
       return attendances.filter((att) => DateTime.fromISO(att.created_at).toLocaleString({month: 'long'}) === month )

        
    }



    return (
        <Box>
            <Grid container >


                {
                    monthReports.map((report) => {
                        const monthlyData = getData(report, attendances)
                        const totalAbsent = monthlyData.filter((att) => att.is_present == false).length

                        const totalPresent = monthlyData.filter((att) => att.is_present == true).length



                        return (

                                <Grid item sm={6} md={4} key={report} >
                                    <Box p={1}>
                                        <Paper elevation={3} sx={{ minHeight: 520,  borderRadius: "10px"}} >
                                            <ThemeProvider theme={boxTheme}>
                                                <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{bgcolor: blue[800], borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}   minHeight={250}  >
                                                    <AttendanceChart reportMonth={report} totalPresent={totalPresent} totalAbsent={totalAbsent} />
                                                </Box>
                                            </ThemeProvider>

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
                                </Grid>


                        )
                    })
                }
             

                
                


                

            </Grid>
          
        </Box>
    )
}