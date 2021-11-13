import { CloudUploadRounded } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Paper, Skeleton, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { FetchContext } from '../../../context/FetchContext'
import { EditStudentDraftContextProvider } from '../../../context/teacher/EditStudentDraftContext'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import ScoreReportDraftInfo from './ScoreReportDraftInfo'
import StudentScoreReportDrafts from './StudentScoreReportDrafts'




export default function EditScoreDraftReportContainer(){

    const param = useParams()
    const {id} = param
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [scoreReportDraft, setScoreReportDraft] = useState({
        max: null,
        published: null,
        scoreType: null,
        subject: null
    })
    const {setAuthState} = useContext(AuthContext)


    useEffect(() => {

        authAxios.get(`api/v1/score_report_drafts/${id}`).then((res) => {
            console.log(res)
            const {score_report_draft, student_score_report_drafts} = res.data
            
            const {max, published, id, score_type, subject} = score_report_draft

            const newScoreReportDraft = Object.assign({}, scoreReportDraft) 
            newScoreReportDraft.max = max
            newScoreReportDraft.published = published
            newScoreReportDraft.scoreType = score_type
            newScoreReportDraft.subject = subject

            setScoreReportDraft(newScoreReportDraft)
            setLoading(false)
        }).catch((err) => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
        })

    }, [])
    
    console.log(id)

    return (
        <Box >

            <Box p={1} >
                <Typography variant="h4" sx={{fontWeight: "bolder"}} > Editing Draft</Typography>
            </Box>

            {
                loading ?
                <Loader /> 
                :
                failed ?
                <FailedFetch message="Failed To Load Draft" height="calc(90vh - 200px)" />
                :
                <>
                <EditStudentDraftContextProvider
                    value={{
                        scoreReportDraft,
                        id,
                    }}
                >
                    <>
                        <ScoreReportDraftInfo scoreReportDraft={scoreReportDraft} />
                        <StudentScoreReportDrafts  />

                    </>


                </EditStudentDraftContextProvider>
                </>
               
            }
            
           
        </Box>
    )
}