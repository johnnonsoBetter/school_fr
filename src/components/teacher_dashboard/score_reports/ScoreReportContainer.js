import { Box, Divider, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { FetchContext } from '../../../context/FetchContext'
import TeacherContext from '../../../context/teacher/TeacherContext'
import queryString from 'query-string'
import Loader from '../../utilities/Loader'
import FailedFetch from '../../utilities/FailedFetch'
import ScoreReports from './ScoreReports'
import { AuthContext } from '../../../context/AuthContext'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

export default function ScoreReportContainer(){

    const {dashboardInfo} = useContext(TeacherContext)
    const {id} = useParams()
    const subject = dashboardInfo.subjects.find(sub => sub.id == id)
    const {authAxios} = useContext(FetchContext)
    const {subjects, scoreTypes, termDates} = dashboardInfo
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const [subject_id, setSubjectId] = useState(subjects[0].id)
    const [score_type_id, setScoreTypeId] = useState(scoreTypes[0].id)
    const [term_date_id, setTermDateId] = useState(termDates[0].id)
    const history = useHistory()
    const location = useLocation()
    const [changed, setChanged] = useState(false)
    const search = queryString.parse(location.search)
    const [scoreReports, setScoreReports] = useState([])
    const {setAuthState} = useContext(AuthContext)

    
    useEffect(() => {

      
        authAxios.get('api/v1/teacher_score_reports', 
        {   params: {
            subject_id: id, 
            score_type_id: scoreTypes[0].id, 
            term_date_id: termDates[0].id

        }})
        .then((res) => {
            setScoreReports(res.data)
           setLoading(false)

            
        }).catch(err => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setFailed(true)
            setLoading(false)
        }) 

        return () => {
         
            setScoreTypeId(scoreTypes[0].id)
            setTermDateId(termDates[0].id)
            setFailed(false)
            setLoading(true)
            setScoreReports([])
        }
    }, [id]) 

    useEffect(() => {
        setLoading(true)
        authAxios.get('api/v1/teacher_score_reports', 
        {   params: {
            subject_id: id, 
            score_type_id: score_type_id, 
            term_date_id: term_date_id

        }})
        .then((res) => {
            setScoreReports(res.data)
           setLoading(false)
        }).catch(err => {
            setFailed(true)
            setLoading(false)
        }) 

        return () => {
            // setScoreTypeId(scoreTypes[0].id)
            // setTermDateId(termDates[0].id)
            // setFailed(false)
            // setLoading(true)
            // setScoreReports([])
        }
        
    }, [score_type_id, term_date_id])



   
    return (
        <Box >
            

            <Box display="flex" justifyContent="flex-start" alignItems="center" p={1} >
                <Typography variant="h5" sx={{fontWeight: "bolder", marginRight: "15px", textTransform: "capitalize"}} > {subject.name} </Typography>
                <FormControl sx={{marginRight: "20px"}} >
                                   
                    <Select
                    name="term"
                    size="small"
                    value={term_date_id}  
                    onChange={(e, value) => {
                        const term = termDates.find(t => t.id === e.target.value)
                        const score_type = scoreTypes.find(t => t.id === score_type_id)
                        
                   
                        setTermDateId(e.target.value)
                       
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
                    name="score_type"
                    size="small"
                    value={score_type_id}  
                    onChange={(e, value) => {
                        setScoreTypeId(e.target.value)

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
            


            <Box marginTop={3}  >

                    {
                        loading ?
                        <Loader /> :
                        failed ? 
                        <FailedFetch message="Failed To Load" height="calc(90vh - 200px)" /> :
                        <ScoreReports scores={scoreReports} />
                    }

            </Box>
        </Box>
    )
}