import { Box, Typography } from '@mui/material'
import React from 'react'
import UnfinishedScoreReportDraftsContainer from './UnfinishedScoreReportDraftsContainer'

export default function Home(){

    return (
        <Box  >
            <Box p={2} >
                <Typography variant="h4" sx={{fontWeight: "bolder"}} >Unfinished Score Reports</Typography>
            </Box>
            <UnfinishedScoreReportDraftsContainer />
        </Box>
    )
}