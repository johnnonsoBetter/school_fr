

import { Avatar, Badge, Box, Chip, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FetchContext } from '../../../../context/FetchContext'
import Empty from '../../../utilities/Empty'
import FailedFetch from '../../../utilities/FailedFetch'
import Loader from '../../../utilities/Loader'
import StudentList from '../../students/StudentList'


const useStyles = makeStyles((theme) => ({

    link: {
        textDecoration: "none"
    }
}))




export default function SubjectInfoContainer(){
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [subjectInfo, setSubjectInfo] = useState({
        subject: '',
        students: [],
        allStudents: [],
        subjects: [],
        teacher: [],
        classroom: {}
    })
    const {id} = useParams()

    useEffect(() => {
        
        authAxios.get(`api/v1/subjects/${id}`).then((res) => {
            console.log(res)
            const {data} = res
            const newClassroomInfo = Object.assign({}, subjectInfo)
            newClassroomInfo.subject = data.subject 
            newClassroomInfo.students = data.students
            newClassroomInfo.allStudents = data.students
            newClassroomInfo.teacher = data.teacher
            newClassroomInfo.subjects = data.subjects
            newClassroomInfo.classroom = data.classroom
            setSubjectInfo(newClassroomInfo)

            setLoading(false)

            //setSubjectInfo(res.data)
        }).catch(err => {
            
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setSubjectInfo({})
        }
    }, [])

    const setStudents = (students) => {
        const newClassroomInfo = Object.assign({}, subjectInfo)
      
        newClassroomInfo.students = students
        setSubjectInfo(newClassroomInfo)
    }



  

    return (
        <>
        

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Subject Info" height="calc(90vh - 200px)"/> : 
            <>  
            <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
                <Typography sx={{mb: { xs: '10px' }, textTransform: "capitalize", fontWeight: "bolder"}} variant="h4"> {subjectInfo.subject}</Typography>
             
                <Box justifyContent="space-around" sx={{display: {xs: "flex"}}}>
                    <Chip variant="outlined" sx={{mr: 1, fontWeight: "bolder"}} avatar={<Avatar>{subjectInfo.allStudents.length}</Avatar>} label="Total Students" />
                    <Link className={classes.link} to="/teachers/3" >
                        <Chip clickable variant="outlined" sx={{mr: 1, fontWeight: "bolder"}} avatar={<Avatar  src="/images/presentation.png"> </Avatar>} label={`${subjectInfo.teacher.full_name}`} />
                    </Link>
                    <Link className={classes.link} to={`/classrooms/${subjectInfo.classroom.id}/`} >
                        <Chip clickable variant="outlined" sx={{mr: 1, fontWeight: "bolder"}} avatar={<Avatar  src="/images/classroom.png"> </Avatar>} label={`${subjectInfo.classroom.name}`} />
                    </Link>
                    
                </Box>
            
            </Box>

            <Box >
                <StudentList allStudents={subjectInfo.allStudents} students={subjectInfo.students} setStudents={setStudents} />
            </Box>
                
            </> 
        }

     
    </>
    )
}