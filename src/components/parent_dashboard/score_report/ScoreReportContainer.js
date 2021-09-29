import { Box, List, ListSubheader } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ScoreReports from './ScoreReports'
import TheDate from './TheDate'
import Loader from '../../utilities/Loader'
import { FetchContext } from '../../../context/FetchContext'
import { ParentContext } from '../../../context/parent/ParentContext'

function ScoreReportContainer(){

    const {authAxios} = useContext(FetchContext)
    const {student_id, children} = useContext(ParentContext)

    console.log("this is the student id", student_id)
    console.log(children)
    const [filteredSubjectHeaders, setFilteredSubjectHeaders] = useState([])
    const [scores, setScores] = useState([])


    useEffect(() => {

        authAxios.get('api/v1/guidance_score_reports', {params: {student_id: 1, date: new Date().toDateString()}}).then((res) => {

            console.log(res)
            const {data} = res
            setScores(data)
            const subjectHeaders = new Set(data.map(sub => (sub.subject))) 
            setFilteredSubjectHeaders([...subjectHeaders])
            console.log(filteredSubjectHeaders)

        }).catch(err => {
            console.log(err)
        })
        console.log("hey")

    }, [])

    return (
        <Box sx={{marginTop: "10px"}} >
            <Box display="flex" justifyContent="flex-end"  >
                <TheDate />

            </Box>
           

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
                        <ListSubheader sx={{fontWeight: "bold", letterSpacing: "0.1em"}}>{`${subject}`}</ListSubheader>
                        <ScoreReports scores={scores.filter(sco => sco.subject === subject)} subject={subject} />
                    </ul>
                    </li>
                ))}
            </List>
        </Box>
    )
}

export default ScoreReportContainer
