import { EditRounded, PersonRounded } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Typography, Zoom } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchContext } from '../../../../../context/FetchContext'
import FailedFetch from '../../../../utilities/FailedFetch'
import Loader from '../../../../utilities/Loader'
import ProfileUpdater from './ProfileUpdater'


export default function Profile() {

    const [openUpdater, setOpenUpdater] = useState(false)
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()

    useEffect(() => {

        authAxios.get(`api/v1/students/${id}`).then((res) => {
            const {student} = res.data
            setStudent(student)
            setLoading(false)
            
        }).catch(err => {
            
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
          
        }
    }, [openUpdater])

    
    


    return (

        <Box >
        {
            loading ?
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Student Profile" height="calc(90vh - 200px)"/> : 
            <>
                {
                    openUpdater ? <ProfileUpdater student={student} setOpenUpdater={setOpenUpdater} /> :
                    <StudentProfile student={student} setOpenUpdater={setOpenUpdater} />
                }
        
            </>
        }
    </Box>


      

        
    )
}




function StudentProfile(props) {
    
  

    const {
        full_name, 
        first_name, 
        last_name, 
        date_of_birth, 
        middle_name, 
        state, 
        lga, 
        date_of_admission,
        religion,
        gender,
        admission_no,
        address,
        classroom,
        image
    } = props.student
    
    

    return (

        <Zoom in={true}> 

        
        <Box mt={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center"> 
            <Grid container alignItems="center" >
                <Grid item xs={12} sm={6} >
                    <Box p={2} maxHeight="280px" display="flex" justifyContent="center"  width="100%">

                            <Paper elevation={7} sx={{borderRadius: "15px", width: 270, display: 'flex', justifyContent: 'center'}}  >
                                <img src={image === null ? '/images/no-pictures.png' : image} style={{maxWidth: "100%", borderRadius: "15px", minHeight: "250px", minWidth: "270px"}}  />
                            </Paper>



                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} >
                    <Box p={2}    width="100%" textAlign="center">

                            <Typography fontWeight={700} variant="h6">{full_name}</Typography>

                            <Box m={2} >

                                <Button variant="outlined" sx={{mr: 2}} onClick={() => {props.setOpenUpdater(true)}} color="warning" endIcon={<EditRounded />}>
                                    Edit
                                </Button>

                                <Button variant="outlined" color="warning" endIcon={<PersonRounded />}>
                                    Gudiances
                                </Button>

                            </Box>



                    </Box>
                </Grid>

                <Grid item xs={12}  >
                    <Grid container >
                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}} >
                                <Box display="flex" mt={1} >
                                    <Typography fontWeight={700} variant="h6">First Name: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}>{first_name} </Typography>
                                    
                                </Box>
                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}} >
                                <Box display="flex" mt={1} >
                                    <Typography fontWeight={700} variant="h6">Middle Name: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {middle_name} </Typography>
                                    
                                </Box>
                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}} >
                                <Box display="flex" mt={1} >
                                    <Typography fontWeight={700} variant="h6">Last Name: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}>{last_name}</Typography>
                                    
                                </Box>
                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1} >
                                    <Typography fontWeight={700} variant="h6">State Of Origin: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {state}</Typography>
                                    
                                </Box>
                            </Paper>


                        </Grid>

                       
                       
                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                 <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Local Gov: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {lga}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Date Of Birth: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {date_of_birth}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>


                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Date Of Adm: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {date_of_admission}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Religion: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {religion}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Gender: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {gender}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Admission NO: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {admission_no}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Adr: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}> {address}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>

                        <Grid item xs={12} sm={6} md={4} >
                            <Paper elevation={2} sx={{m: 1, p: 2}}  >
                                <Box display="flex" mt={1}  >
                                    <Typography fontWeight={700} variant="h6">Class: </Typography>
                                    <Typography fontWeight={700} variant="h6" sx={{ml: 2, textTransform: "capitalize"}}>{classroom}</Typography>
                                    
                                </Box>

                            </Paper>


                        </Grid>
                    </Grid>
                    
                </Grid>

         
            </Grid>
            
        </Box>

        
        </Zoom>



    )
}

