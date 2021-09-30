import { Box,Chip, Paper, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React from 'react'
import BillDetail from './BillDetail'


export default function Bill(props){
    const {title, payment_completed, total_amount, id} = props.bill

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography > {title} </Typography>
                    <Box display="flex" >
                        
                       
                       <Chip  color="primary" variant="outlined" label={total_amount}  />
                       <Chip label={payment_completed ? "Paid" : "Not Paid"} sx={{color: payment_completed ? green[700] : red[300]}} variant="outlined" />
                       <BillDetail id={id} />
                       
                    </Box>
                                  
                </Box>

            </Paper>
        </Box>
    )
}