import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'

export default function ScoreReportDraftInfo({scoreReportDraft}){

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" >
                    
            <Box marginRight={1}>
                <Typography sx={{fontWeight: "bolder", textTransform: "capitalize"}} > {scoreReportDraft.subject} </Typography>
                
            </Box>
            <Box marginRight={1}>
                <Divider orientation="vertical" sx={{color: "red", height: "20px"}}  />
            </Box>
            
            <Box marginRight={1} >
                <Typography sx={{fontWeight: "bolder", textTransform: "capitalize"}}> {scoreReportDraft.scoreType} </Typography>
            </Box>

            <Box marginRight={1}>
                <Divider orientation="vertical" sx={{color: "red", height: "20px"}}  />
            </Box>
        

            <Box  >
                <Paper  sx={{width: "50px", padding: "2px", backgroundColor: "#00A6FF"}} >
                    <Typography textAlign="center"  sx={{color: "white", fontWeight: "bold"}}> {scoreReportDraft.max} </Typography>
                </Paper>
            </Box>
        
        </Box>
    )
}