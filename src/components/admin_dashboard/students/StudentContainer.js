


import { Box, Chip, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import GroupedStudentFilterInput from './GroupStudentFilterInput'
import StudentList from './StudentList'


export default function StudentContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [students, setStudents] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const {setAuthState} = useContext(AuthContext)

    useEffect(() => {

        authAxios.get('api/v1/students').then((res) => {
            console.log(res)
            setLoading(false)
            setStudents(res.data)
            setAllStudents(res.data)
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
            setStudents([])
            setAllStudents([])
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">All Students</Typography>

            {
                allStudents !== 0 && <Chip variant="outlined" sx={{mr: "10px", textTransform: "capitalize"}} label={`${allStudents.length}`} />
            }
            
        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Students" height="calc(90vh - 200px)"/> : 
            <>  
            {
            students.length === 0 ? 
            <Empty message="No Students Found" height="calc(90vh - 200px)"/> :
            <StudentList allStudents={allStudents} students={students} setStudents={setStudents} />
            
            
            }

            </> 
        }

         </Box>
    </>
    )
}