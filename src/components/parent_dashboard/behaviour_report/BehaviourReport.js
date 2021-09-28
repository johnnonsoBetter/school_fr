import { GppGoodRounded, SmsRounded } from '@mui/icons-material'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import BehaviourReportDetail from './BehaviourReportDetail'


export default function BehaviourReport(){

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography sx={{fontWeight: "bold", color: "GrayText"}}> Noise Maker </Typography>
                    <Box display="flex" >
                        
                       
                        <BehaviourReportDetail />
                    </Box>
                    
                </Box>

            </Paper>
        </Box>
    )
}