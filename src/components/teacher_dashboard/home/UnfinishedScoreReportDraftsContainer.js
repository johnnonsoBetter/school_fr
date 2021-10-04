import { Box, Grid } from '@mui/material'
import React from 'react'
import UnfinishedScoreReportDraft from './UnfinishedScoreReportDraft'

export default function UnfinishedScoreReportDraftsContainer(){

    return (
        <Grid container >
           {
               [6, 5, 7, 2, 9, 4, 12].map((unfinishedScoreDraft) => {

                    return (
                        <Grid zeroMinWidth key={unfinishedScoreDraft} spacing={3} item xs={12} sm={6} md={6} lg={4}> 
                            <UnfinishedScoreReportDraft />
                        </Grid>
                    )
               })
           }
        </Grid>
    )
}