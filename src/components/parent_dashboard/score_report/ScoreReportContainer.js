import { Avatar, Box, Chip, List, ListSubheader } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ScoreReports from './ScoreReports'
import TheDate from './TheDate'
import Loader from '../../utilities/Loader'
import { FetchContext } from '../../../context/FetchContext'
import { ParentContext } from '../../../context/parent/ParentContext'
import Empty from '../../utilities/Empty'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors'
import FailedFetch from '../../utilities/FailedFetch'
import { AuthContext } from '../../../context/AuthContext'



function ScoreReportContainer(){

    const {authAxios} = useContext(FetchContext)
    const {student_id, student} = useContext(ParentContext)
    const [filteredSubjectHeaders, setFilteredSubjectHeaders] = useState([])
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const location = useLocation()
    const {setAuthState} = useContext(AuthContext)

    const value = queryString.parse(location.search)
    const child = student()

    useEffect(() => {
        setLoading(true)
        authAxios.get('api/v1/guidance_score_reports', {params: {student_id: student_id, date: Object.keys(value).length === 0 ? new Date().toDateString() : value.date}}).then((res) => {

            console.log(res)
            const {data} = res
            setScores(data)
            const subjectHeaders = new Set(data.map(sub => (sub.subject))) 
            setFilteredSubjectHeaders([...subjectHeaders])
            setLoading(false)

        }).catch(err => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setLoading(false)
            setFailed(true)
        })
       

    }, [location.search, student_id])







    return (
        <Box  >

            {
                
                loading ? <Loader /> :
                failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :

            <>
            <Box display="flex" p={2} justifyContent="space-between" alignItems="center"  >
                <Chip sx={{bgcolor: blue[300], color: "white", fontWeight: "bold", textTransform: "capitalize"}} avatar={<Avatar   src="/images/nonso.png" />} label={`${child.first_name} ${child.last_name}`}  />
                <TheDate />

            </Box>

                {
                scores.length !== 0 ?
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: "calc(95vh - 200px)",
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                    >
                    {filteredSubjectHeaders.map((subject) => (
                        <li key={`section-${subject}`}>
                        <ul>
                            <ListSubheader sx={{fontWeight: "bold", letterSpacing: "0.1em", textTransform: "capitalize"}}>{`${subject}`}</ListSubheader>
                            <ScoreReports scores={scores.filter(sco => sco.subject === subject)} subject={subject} />
                        </ul>
                        </li>
                    ))}
                </List>
                : <Empty message="No Score Report Found" height="calc(90vh - 200px)" /> 

                }
           

            
            </>
            }
        </Box>
    )
}

export default ScoreReportContainer
