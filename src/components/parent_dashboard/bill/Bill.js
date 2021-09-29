import { Box,Chip, Paper, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import BillDetail from './BillDetail'


export default function Bill(){

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography > Exam Fee </Typography>
                    <Box display="flex" >
                        
                       
                       <Chip  color="primary" variant="outlined" label="₦3,600" />
                       <Chip label="Not Paid" sx={{color: red[300]}} variant="outlined" />
                       <BillDetail />
                       
                    </Box>
                    
                </Box>

            </Paper>
        </Box>
    )
}