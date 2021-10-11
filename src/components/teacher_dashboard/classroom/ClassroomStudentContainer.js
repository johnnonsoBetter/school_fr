import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FetchContext } from '../../../context/FetchContext'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import Empty from '../../utilities/Empty'
import GroupedStudentFilterInput from './GroupStudentFilterInput'
import Student from './Student'

export default function ClassroomStudentContainer(){

    const {id} = useParams()
    const {authAxios} = useContext(FetchContext)
    const [students, setStudents] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)

    useEffect(() => {

        authAxios.get('api/v1/teacher_classroom_students', {params: {classroom_id: id}}).then((res) => {
            console.log(res)
            setStudents(res.data)
            setAllStudents(res.data)
            setLoading(false)
            
        }).catch(err => {
         
            setLoading(false)
            setFailed(true)
        })

        
        
    }, [])



    return (

        <Box>
           <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
               <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Js1 Students</Typography>

               <GroupedStudentFilterInput students={students} setStudents={setStudents} allStudents={allStudents}/>
           </Box>

           {

                loading ?
                <Loader /> :
                failed ?
                <FailedFetch height="calc(90vh - 200px)" message="Failed To Load Students"/>:

                <Box maxHeight="calc(100vh - 180px)" overflow="auto">
                    {
                        students.length === 0 ?
                        <Empty height="calc(90vh - 200px)" /> :
                        <Grid container >
                            {
                                students.map((student) => {
                                    return (
                                        <Grid key={student.id} item xs={12} sm={12} md={6} >
                                            <Student student={student} />
                                        </Grid>

                                    )
                                })
                            }
                        
                            
                        </Grid>
                    }

                </Box>


           }
          
        </Box>
    )
}