import { BarChartRounded } from '@mui/icons-material'
import { Avatar, Box, Grid, Grow, Paper, Stack, Typography } from '@mui/material'
import { blue, blueGrey, green, grey, orange, pink, purple, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../../../context/admin/AdminContext'
import { FetchContext } from '../../../context/FetchContext'
import WellcomeMessage from './WellcomeMessage'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import AmountFormatter from '../../utilities/AmountFormatter'
import HomeDebtRecovered from './HomeDebtRecovered'
import Loader from '../../utilities/Loader'
import FailedFetch from '../../utilities/FailedFetch'

const useStyles = makeStyles((theme) => ({
    link: {
        color: "black",
        textDecoration: "none"
    }
}))

export default function Home(){

    const {authAxios} = useContext(FetchContext)
    const {dashboardInfo, setDashboardInfo} = useContext(AdminContext)
    const classes = useStyles()
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalClassrooms, setTotalClassrooms] = useState(0)
    const [totalTeachers, setTotalTeachers] = useState(0)
    const [totalDebts, setTotalDebts] = useState(0)
    const [totalDebtRecovered, setTotalDebtRecovered] = useState(0)
    const [debtRecoveredReports, setDebtRecoveredReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    

    useEffect(() => {

        authAxios.get('api/v1/admin_dashboards').then((res) => {

            console.log(res)
            const {classrooms, teachers, score_types, term_dates, total_students, total_classrooms, total_teachers, total_debts, debt_recovered_reports, total_recovered_reports} = res.data

            const newDashboardInfo = Object.assign({}, dashboardInfo)
            newDashboardInfo.classrooms = classrooms
            newDashboardInfo.teachers = teachers
            newDashboardInfo.scoreTypes = score_types
            newDashboardInfo.termDates = term_dates
            setTotalStudents(total_students)
            setTotalTeachers(total_teachers)
            setTotalClassrooms(total_classrooms)
            setTotalDebtRecovered(total_recovered_reports)
            setTotalDebts(total_debts)
            setDebtRecoveredReports(debt_recovered_reports)
            setLoading(false)

            setDashboardInfo(newDashboardInfo)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })



        return () => {
          setLoading(true)
          setFailed(false)
          setDebtRecoveredReports(0)
          setTotalStudents(0)
          setTotalTeachers(0)
          setTotalClassrooms(0)
          setTotalDebts(0)
          setTotalDebtRecovered(0)
        }
        
    }, [])


    return (

      <>

        {

         


        loading ? 
        <Loader /> :
        failed ?
        <FailedFetch message="Failed To Load DebtsRecovered" height="calc(90vh - 200px)"/> : 

        <Grow in={true} >
        <Box >
           <WellcomeMessage />
           <Grid container spacing={3} >
           <Grid item xs={6} sm={6} md={4}  >
                   <Paper elevation={2} >
                       <Box p={2}>

                            <Box display="flex" justifyContent="space-between">
                                <Box  display="flex" justifyContent="flex-end">
                                    <Stack >
                                        <Typography fontWeight={700}> Total Students</Typography>
                                        <Box display="flex" alignItems="center" >  <BarChartRounded /> <Typography> {totalStudents} </Typography> </Box>
                                             
                                        <Typography> <Link to='/students' className={classes.link} > View</Link></Typography>
                                    </Stack>
                                </Box>

                                <Box  display="flex" justifyContent="center" alignItems='center' >
                                   <img src="/images/reading (1).png" style={{width: 50, maxWidth: "100%"}} />
                                
                                
                                </Box>
                                
                            </Box>
                           
                          
                       </Box>
                   </Paper>
               </Grid>

               <Grid item xs={6} sm={6} md={4}  >
                   <Paper elevation={2} >
                       <Box p={2}>

                            <Box display="flex" justifyContent="space-between">
                                <Box  display="flex" justifyContent="flex-end">
                                    <Stack >
                                        <Typography fontWeight={700}> Total Teachers</Typography>
                                        <Box display="flex" alignItems="center" >  <BarChartRounded /> <Typography> {totalTeachers} </Typography> </Box>
                                             
                                        <Typography> <Link to='/teachers' className={classes.link} > View</Link></Typography>
                                    </Stack>
                                </Box>

                                <Box  display="flex" justifyContent="center" alignItems='center' >
                                   <img src="/images/presentation (1).png" style={{width: 50, maxWidth: "100%"}} />
                                
                                
                                </Box>
                                
                            </Box>
                           
                          
                       </Box>
                   </Paper>
               </Grid>



               <Grid item xs={12} sm={6} md={4} >
                   <Paper elevation={2} >
                       <Box p={2}>

                            <Box display="flex" justifyContent="space-between">
                                <Box  display="flex" justifyContent="flex-end">
                                    <Stack >
                                        <Typography fontWeight={700}> Total Classroom</Typography>
                                        <Box display="flex" alignItems="center" >  <BarChartRounded /> <Typography> {totalClassrooms} </Typography> </Box>
                                             
                                        <Typography> <Link to='/subjects' className={classes.link} > View</Link></Typography>
                                    </Stack>
                                </Box>

                                <Box  display="flex" justifyContent="center" alignItems='center' >
                                   <img src="/images/classroom (1).png" style={{width: 50, maxWidth: "100%"}} />
                                
                                </Box>
                                
                            </Box>
                           
                          
                       </Box>
                   </Paper>
               </Grid>

               <Grid item xs={12} sm={6} >
                   <Paper elevation={2} >
                       <Box p={2}>

                            <Box display="flex" justifyContent="space-between">
                                <Box  display="flex" justifyContent="flex-end">
                                    <Stack >
                                        <Typography fontWeight={700}> Total Debts</Typography>
                                        <Box display="flex" alignItems="center" >  <Typography fontWeight={600}> ₦{AmountFormatter(totalDebts).amount()} </Typography> </Box>
                                             
                                        <Typography> <Link to='/debtors' className={classes.link} > View</Link></Typography>
                                    </Stack>
                                </Box>

                                <Box  display="flex" justifyContent="center" alignItems='center' >
                                    <img src="/images/debt (1).png" style={{width: 50, maxWidth: "100%"}} />
                                
                                </Box>
                                
                            </Box>
                           
                          
                       </Box>
                   </Paper>
               </Grid>

               <Grid item xs={12} sm={6} >
                   <Paper elevation={2} >
                       <Box p={2}>

                            <Box display="flex" justifyContent="space-between">
                                <Box  display="flex" justifyContent="flex-end">
                                    <Stack >
                                        <Typography fontWeight={700}> Today Recovered Debt</Typography>
                                        <Box display="flex" alignItems="center" >   <Typography fontWeight={600} >₦{AmountFormatter(totalDebtRecovered).amount()} </Typography> </Box>
                                             
                                        <Typography> <Link to='/transactions/debt_recovered' className={classes.link} > View</Link></Typography>
                                    </Stack>
                                </Box>

                                <Box  display="flex" justifyContent="center" alignItems='center' >
                                   
                                   <img src="/images/send-money.png" style={{width: 50, maxWidth: "100%"}} />
                                
                                
                                </Box>
                                
                            </Box>
                           
                          
                       </Box>
                   </Paper>
               </Grid>
           </Grid>

           <Box mt={2} height="300px"   maxHeight="300px"  >
               {/* <CustomizedTables /> */}
               {
                 debtRecoveredReports.length !== 0 && <HomeDebtRecovered debts_recovered={debtRecoveredReports} />
               }


               
           </Box>
        </Box>
        </Grow>


        
      }
      </>
    )
}



