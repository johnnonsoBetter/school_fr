

import { Box, Chip, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import GroupedTeacherFilterInput from './GroupTeacherFilterInput'
import TeacherList from './TeacherList'


export default function TeacherContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [teachers, setTeachers] = useState([])
    const [allTeachers, setAllTeachers] = useState([])
    const {setAuthState} = useContext(AuthContext)

    useEffect(() => {

        authAxios.get('api/v1/teachers').then((res) => {
           
            setLoading(false)
            setTeachers(res.data)
            setAllTeachers(res.data)
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
            setTeachers([])
            setAllTeachers([])
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">All Teachers</Typography>

            {
                allTeachers !== 0 && <Chip variant="outlined" sx={{mr: "10px", textTransform: "capitalize"}} label={`${allTeachers.length}`} />
            }
            
        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Teachers" height="calc(90vh - 200px)"/> : 
            <>  
            {
            teachers.length === 0 ? 
            <Empty message="No Teachers Found" height="calc(90vh - 200px)"/> :
            <TeacherList allTeachers={allTeachers} teachers={teachers} setTeachers={setTeachers} />
            
            
            }

            </> 
        }

         </Box>
    </>
    )
}