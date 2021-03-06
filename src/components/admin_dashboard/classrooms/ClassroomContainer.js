import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import Classroom from './Classroom'


export default function ClassroomContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [classrooms, setClassrooms] = useState([])
    const {setAuthState} = useContext(AuthContext)
    useEffect(() => {
        
        authAxios.get('api/v1/classrooms').then((res) => {
           
            setLoading(false)
            setClassrooms(res.data)
        }).catch(err => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setClassrooms([])
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Classrooms</Typography>
           
        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Classrooms" height="calc(90vh - 200px)"/> : 
            <>  
            {
            classrooms.length === 0 ? 
            <Empty message="No Classrooms Found" height="calc(90vh - 200px)"/> :
            <Box >

                <Grid container >
                    

                    {
                        classrooms.map((classroom) => {

                            return (
                                <Grid key={Classroom.id} item xs={12} sm={6} md={4} >
                                    <Classroom classroom={classroom} />            
                                </Grid>
                            )
                        })
                    }
                </Grid>
                


            </Box>
            
            }

            </> 
        }

         </Box>
    </>
    )
}