import { PrintRounded } from '@mui/icons-material'
import { Avatar, Box, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { blue, blueGrey, grey } from '@mui/material/colors'
import React, { useContext } from 'react'
import AdminContext from '../../../context/admin/AdminContext'
import ReportAttitude from './ReportAttitude'
import ReportGrade from './ReportGrade'


export default function ReportCardContainer() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)


    function handleSnack () {

        const newSnackBarInfo = Object.assign(snackInfo, {})
        newSnackBarInfo.message = `This is a demo version, with stale data, To print, school must be authorized`
        newSnackBarInfo.severity = 'info'
        setSnackInfo(newSnackBarInfo)
        setOpenSnack(true)
    }



    return (
        <Paper elevation={3} sx={{mt: 2}}>
            <Box display="flex" justifyContent="space-between" sx={{justifyContent: {xs: "center", sm: "space-between"}}} flexWrap="wrap" alignItems="center" p={2} >
                <Box width={60}  >
                    <img src="/images/praise.png" alt="Report" style={{maxWidth: "100%"}} />
                </Box>
 
                <Box textAlign="center" m={2} >
                    <Typography variant="h6" fontWeight={800}> First Term Report Card 2021/2022</Typography>
                </Box>

                <Box >
                    <IconButton color="info" onClick={handleSnack}>
                    <PrintRounded />
                    </IconButton>
                   
                </Box>

            </Box>

            <Box m={2} >
                <Box display="flex" justifyContent="center">
                    <Avatar  src="/images/nonso.png" />
                    
                </Box>
                <Box display="flex" m={1} justifyContent="center" >
                <Typography>Chinonso John Bobby</Typography>
                <Divider  sx={{ backgroundColor: grey[200], mr: 1, ml: 1, padding: "1px"}} variant="vertical" />

                <Typography>S.S.3</Typography>
                </Box>
                
            </Box>

            <Box m={2} >
                
                <Grid container p={2} spacing={5} >
                    <Grid item xs={12} sm={6} zeroMinWidth >
                    <Box ><Typography sx={{p: 1}}>Performance Summary</Typography></Box>
                        <Box display="flex" borderRadius={1} p={1} sx={{backgroundColor: grey[100]}} width="100%" justifyContent="space-between" >
                            <Stack >
                                <Typography>Total Obtained</Typography>
                                <Typography>Total Obtainable</Typography>
                                <Typography>Grade</Typography>
                            </Stack>

                            <Divider  sx={{ backgroundColor: blue[200], padding: "2px"}} variant="vertical" />

                            <Stack >
                                <Typography>1300</Typography>
                                <Typography>1500</Typography>
                                <Typography> A 89%</Typography>
                            </Stack>
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={6} zeroMinWidth>
                        <Box ><Typography sx={{p: 1}}>Attendance Summary</Typography></Box>
                        <Box display="flex" borderRadius={1} p={1} sx={{backgroundColor: grey[100]}} width="100%" justifyContent="space-between" >
                            <Stack >
                                <Typography>No. School Opened</Typography>
                                <Typography>No. Times Present</Typography>
                                <Typography>No. Times Absent</Typography>
                            </Stack>

                            <Divider  sx={{ backgroundColor: blue[200], padding: "2px"}} variant="vertical" />

                            <Stack >
                                <Typography>150</Typography>
                                <Typography>120</Typography>
                                <Typography> 30</Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} zeroMinWidth>
                        <ReportGrade />
                    </Grid>

                    <Grid item xs={12} sm={6} zeroMinWidth>
                        <ReportAttitude />
                    </Grid>

                    <Grid item xs={12} sm={6} zeroMinWidth>
                        <Box m={2} >
                            <Stack >
                                <Typography variant="h5" fontWeight={700}>Principal Remark</Typography>
                                <Typography variant="h6">Mr Paul Eneigui Kingsley</Typography>
                                <Typography variant="body1">The student is a very good child and could really make lots of improvement next term</Typography>
                                <Box display="flex" justifyContent="flex-start" >
                                    <img src="/images/prop_sign.png" alt="Report" style={{maxWidth: "100%"}} />
                                </Box>
 
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} zeroMinWidth>
                        <Box m={2} >
                            <Stack >
                                <Typography variant="h5" fontWeight={700}>Class-Teacher Remark</Typography>
                                <Typography variant="h6">Mrs Sharon Ezubelume</Typography>
                                <Typography variant="body1">The student is a very good child and could really make lots of improvement next term</Typography>
                                <Box display="flex" justifyContent="flex-start" >
                                    <img src="/images/teacher_sign.png" alt="Report" style={{maxWidth: "100%"}} />
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="body2" textAlign="center" >Powered By @ConfamSolution</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}