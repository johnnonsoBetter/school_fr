import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import TeacherContext from '../../../context/teacher/TeacherContext'
import ScoreReportDraft from '../score_report_drafts/ScoreReportDraft'
import UnfinishedScoreReportDraft from './UnfinishedScoreReportDraft'

export default function UnfinishedScoreReportDraftsContainer(){

    const {unfinishedDrafts} = useContext(TeacherContext).dashboardInfo
    

    return (
        <Grid container >
           {
               unfinishedDrafts.map((unfinishedScoreDraft) => {

                    return (
                        <Grid zeroMinWidth key={unfinishedScoreDraft.id} spacing={3} item xs={12} sm={6} md={6} lg={4}> 
                            <ScoreReportDraft scoreReportDraft={unfinishedScoreDraft} />
                        </Grid>
                    )
               })
           }
        </Grid>
    )
}