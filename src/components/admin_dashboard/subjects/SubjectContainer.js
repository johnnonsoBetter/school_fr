import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import Subject from './Subject'
import SubjectList from './SubjectList'


export default function SubjectContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [subjects, setSubjects] = useState([])
    const {setAuthState} = useContext(AuthContext)


    useEffect(() => {
        
        authAxios.get('api/v1/subjects').then((res) => {
            console.log(res)
            setLoading(false)
            setSubjects(res.data)
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
            setSubjects([])
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Subjects</Typography>
           
        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Subjects" height="calc(90vh - 200px)"/> : 
            <>  
            {
            subjects.length === 0 ? 
            <Empty message="No Subjects Found" height="calc(90vh - 200px)"/> :
            <SubjectList subjects={subjects} />
            
            }

            </> 
        }

         </Box>
    </>
    )
}