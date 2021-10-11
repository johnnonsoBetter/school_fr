
import { GppBadRounded, GppGoodRounded } from '@mui/icons-material'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import React from 'react'
import BehaviourReportDetail from './BehaviourReportDetail'


export default function BehaviourReport(props){
    const {behaviourReport} = props
    const { behaviour_type, student} = behaviourReport
    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography sx={{fontWeight: "bold", color: "GrayText", textTransform: "capitalize"}}> {student} </Typography>
                    <Box display="flex" alignItems="center" >
                        
                    <Avatar sx={{width: 30, height: 30, bgcolor: behaviour_type === "Good" ? green[500] :  red[500] }} > {behaviour_type === "Good" ? <GppGoodRounded /> :  <GppBadRounded /> } </Avatar>
                        <BehaviourReportDetail behaviourReport={behaviourReport} />
                    </Box>
                    
                </Box>

            </Paper>
        </Box>
    )
}