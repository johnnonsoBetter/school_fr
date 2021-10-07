import { Box, Divider, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FetchContext } from '../../../context/FetchContext'
import TeacherContext from '../../../context/teacher/TeacherContext'

export default function ScoreReportContainer(){

    const {dashboardInfo} = useContext(TeacherContext)
    const {id} = useParams()
    const subject = dashboardInfo.subjects.find(sub => sub.id == id)
    const {authAxios} = useContext(FetchContext)
    const {subjects, scoreTypes, termDates} = dashboardInfo


    useEffect(() => {
        console.log("miller")
        authAxios.get('api/v1/teacher_score_reports', 
        {   params: {
            subject_id: subjects[0].id, 
            score_type: scoreTypes[0].name, 
            term_date_id: termDates[0].id

        }}
       
            
            ).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        }) 
    }, []) 

    useEffect(() => {
        
        authAxios.get('api/v1/teacher_score_reports', 
        {   params: {
            subject_id: subjects[0].id, 
            score_type: scoreTypes[0].name, 
            term_date_id: termDates[0].id

        }}
       
            
            ).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        }) 
    }, [id]) 

    return (
        <Box >
            <Box display="flex" justifyContent="flex-start" alignItems="center" p={1} >
                <Typography variant="h5" sx={{fontWeight: "bolder", marginRight: "15px", textTransform: "capitalize"}} > {subject.name} </Typography>
                <FormControl sx={{marginRight: "20px"}} >
                                   
                    <Select
                    name="term"
                    size="small"
                    value={dashboardInfo.termDates[0].id}  
                    onChange={(e, value) => {
                        console.log(value)
                    }}
                    
                    >

                    {
                        dashboardInfo.termDates.map((term) => {
                            return (
                            <MenuItem key={term.id} value={term.id}>{term.name}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>

                <FormControl sx={{marginRight: "20px"}} >
                                   
                    <Select
                    name="term"
                    size="small"
                    value={dashboardInfo.scoreTypes[0].id}  
                    onChange={(e, value) => {
                        console.log(e.target.value)
                    }}
                    
                    
                    >

                    {
                        dashboardInfo.scoreTypes.map((scoreType) => {
                            return (
                            <MenuItem key={scoreType.id} value={scoreType.id}>{scoreType.name}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>
               
            </Box>
            <Divider />
        </Box>
    )
}