import { Box, List, ListSubheader } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminContext from '../../../../../context/admin/AdminContext'
import { ScoreReportContextProvider } from '../../../../../context/admin/ScoreReportContext'
import { FetchContext } from '../../../../../context/FetchContext'
import ScoreReports from '../../../../parent_dashboard/score_report/ScoreReports'
import Empty from '../../../../utilities/Empty'
import FailedFetch from '../../../../utilities/FailedFetch'
import Loader from '../../../../utilities/Loader'
import ScoreReportTerm from './ScoreReportTerm'
import ScoreReportType from './ScoreReportType'



export default function ScoreReportContainer(){

    
    const {dashboardInfo} = useContext(AdminContext)
    const [termDates, setTermDates] = useState([])
    const [scoreTypes, setScoreTypes] = useState([].concat('All'))
    const [term_id, setTermId] = useState(-1)
    const [scoreType, setScoreType] = useState(scoreTypes[scoreTypes.length - 1])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [scoreReports, setScoreReports] = useState([])
    const [filteredSubjectHeaders, setFilteredSubjectHeaders] = useState([])
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()


    useEffect(() => {
        

        if (term_id == -1) {
            setLoading(true)
            authAxios.get('api/v1/admin_student_score_reports/', {params: {score_type: scoreType, student_id: id}})
        
            .then((res) => {
    

                const {term_dates, score_reports, score_types} = res.data
                setScoreTypes(score_types.map((score) => score.name).concat("All"))
                setTermDates(term_dates)
                setTermId(term_dates[0].id)
                setScoreReports(score_reports)
                const subjectHeaders = new Set(score_reports.map(sub => (sub.subject))) 
                setFilteredSubjectHeaders([...subjectHeaders])
                setLoading(false)
                
    
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setFailed(true)
            })
            

        }else {
            setLoading(true)
            authAxios.get('api/v1/admin_student_score_reports/', {params: {term_id: term_id, score_type: scoreType, student_id: id}})
       
            .then((res) => {
     
                const {score_reports} = res.data
               
                setScoreReports(score_reports)
                const subjectHeaders = new Set(score_reports.map(sub => (sub.subject))) 
                setFilteredSubjectHeaders([...subjectHeaders])
                setLoading(false)
                 
     
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setFailed(true)
            })



          
        }
        
 
 
     }, [term_id, scoreType])

    useEffect(() => {

       


    }, [])


    return (
       <ScoreReportContextProvider
        value={{
            termDates,
            scoreTypes,
            term_id,
            scoreType,
            setTermId,
            setScoreType,
        }}
       >
           
         <Box display="flex" justifyContent="flex-end" flexGrow={1} p={1}>
            <ScoreReportTerm />
            <ScoreReportType />
         </Box>
         {
                
                loading ? <Loader /> :
                failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :

            <>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}  >
                
            </Box> 
               {
                    scoreReports.length === 0 ?
                    <Empty message="No Score Report Found" height="calc(90vh - 200px)" /> :
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
                                <ScoreReports scores={scoreReports.filter(sco => sco.subject === subject)} subject={subject} />
                            </ul>
                            </li>
                        ))}
                    </List>

                    
               }

            </>

            }

       </ScoreReportContextProvider>
    )
}