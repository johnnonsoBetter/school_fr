import { Avatar, Badge, Box, Chip, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchContext } from '../../../../context/FetchContext'
import Empty from '../../../utilities/Empty'
import FailedFetch from '../../../utilities/FailedFetch'
import Loader from '../../../utilities/Loader'
import ClassroomInfoTabs from './ClassroomInfoTabs'



export default function ClassroomInfoContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [classroomInfo, setClassroomInfo] = useState({
        name: '',
        students: [],
        allStudents: [],
        allTeachers: [],
        subjects: [],
        teachers: []
    })
    const {id} = useParams()

    useEffect(() => {
        
        authAxios.get(`api/v1/classrooms/${id}`).then((res) => {
            console.log(res)
            const {data} = res
            const newClassroomInfo = Object.assign({}, classroomInfo)
            newClassroomInfo.name = data.name 
            newClassroomInfo.students = data.students
            newClassroomInfo.allStudents = data.students
            newClassroomInfo.allTeachers = data.teachers
            newClassroomInfo.teachers = data.teachers
            newClassroomInfo.subjects = data.subjects
            setClassroomInfo(newClassroomInfo)

            setLoading(false)

            //setClassroomInfo(res.data)
        }).catch(err => {
            
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setClassroomInfo({})
        }
    }, [])



    const setStudents = (students) => {
        const newClassroomInfo = Object.assign({}, classroomInfo)
      
        newClassroomInfo.students = students
        setClassroomInfo(newClassroomInfo)
    }

    const setTeachers = (teachers) => {
        const newClassroomInfo = Object.assign({}, classroomInfo)
      
        newClassroomInfo.teachers = teachers
        setClassroomInfo(newClassroomInfo)
    }


    return (
        <>
        

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load ClassroomInfo" height="calc(90vh - 200px)"/> : 
            <>  
            <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
                <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4"> {classroomInfo.name}</Typography>
             
                <Box justifyContent="space-around" sx={{display: {xs: "flex"}}}>
                    <Chip variant="outlined" sx={{mr: 1, fontWeight: "bolder"}} avatar={<Avatar>{classroomInfo.allStudents.length}</Avatar>} label="Total Students" />
                    <Chip variant="outlined" sx={{mr: 1, fontWeight: "bolder"}} avatar={<Avatar>{classroomInfo.teachers.length}</Avatar>} label="Total Teachers" />
                    <Chip variant="outlined" sx={{mr: 1, fontWeight: "bolder"}} avatar={<Avatar>{classroomInfo.subjects.length}</Avatar>} label="Total Subjects" />
                </Box>
            
            </Box>
                <ClassroomInfoTabs classroomInfo={classroomInfo}  setStudents={setStudents} setTeachers={setTeachers} />
            </> 
        }

     
    </>
    )
}