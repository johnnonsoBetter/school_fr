import { DoubleArrow, DoubleArrowRounded } from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

export default function UnfinishedScoreReportDraft(props){

    const {max, score_type, subject, created_at, id} = props.scoreReportDraft

    return (
        <Box width="100%" p={1} >
            <Paper sx={{padding: "16px", borderRadius: "12px"}} elevation={2} >
                <Box >
                    <Box display="flex" flexDirection="column"  >
                        <Typography sx={{fontWeight: "bolder", textTransform: "capitalize"}} > {score_type} </Typography>
                        <Typography variant="body2" sx={{color: "#4E7BAB", textTransform: "capitalize"}} > {subject} </Typography>
                    </Box>

                    <Box marginTop={2} >
                        <Paper  sx={{width: "50px", padding: "10px", backgroundColor: "#00A6FF"}} >
                            <Typography textAlign="center"  sx={{color: "white", fontWeight: "bold"}}> {max} </Typography>
                        </Paper>
                    </Box>

                    <Box display="flex" justifyContent="space-between" marginTop={2} >
                        <Typography > 2 days ago </Typography>
                        <DoubleArrow  sx={{color: "#E05D5D"}} />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}