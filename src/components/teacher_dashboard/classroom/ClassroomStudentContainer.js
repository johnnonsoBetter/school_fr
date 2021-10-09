import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FetchContext } from '../../../context/FetchContext'

export default function ClassroomStudentContainer(){

    const {id} = useParams()
    const {authAxios} = useContext(FetchContext)
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        // authAxios.get('api/v1/teacher_classroom_students', {params: {classroom_id: id}}).then((res) => {

        // }).catch(err => {

        // })
       
        `   `
    }, [])



    return (

        <Box>
            Students
        </Box>
    )
}