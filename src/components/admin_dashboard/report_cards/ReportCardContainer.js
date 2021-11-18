import { BookOutlined, PrintOutlined, UploadFileRounded } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../../../context/admin/AdminContext'



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
        <Box >
            <Grid container >
                <Grid item xs={12} sm={6} md={3} >
                    <Link style={{textDecoration: "none"}} p={1} minHeight={600} to={`students/5/report_cards`} >
                        <Paper sx={{minHeight: 250, borderRadius: "10px", background: "linear-gradient(to top right,red, #f06d0)"}}>
                            <Box p={1} >
                                <Box display="flex" justifyContent="space-between" alignItems="center" >
                                    <Avatar sx={{width: 25, height: 25}}>J</Avatar>
                                    
                                    <IconButton onClick={handleSnack}>
                                    <PrintOutlined />
                                    </IconButton>
                                </Box>

                                <Box minHeight={170} display="flex" justifyContent="center" alignItems="center"  >
                                    <Avatar src="/images/nonso.png" />
                                </Box>

                                <Stack  >
                                    <Typography>J.S.S 3</Typography>
                                    <Typography>Chinonso John Bobby</Typography>
                                </Stack>
                            </Box>
                        </Paper>
                    </Link>

                </Grid>
            </Grid>
        </Box>
    )
}