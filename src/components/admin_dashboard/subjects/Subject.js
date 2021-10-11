import { VisibilityRounded } from '@mui/icons-material'
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material'
import { blue, green } from '@mui/material/colors'
import React from 'react'


export default function Subject(props){
    const {name, id} = props.subject
    return (
        <Box width="100%" sx={{padding: "5px"}} > 
            <Paper elevation={2} sx={{borderRadius: "5px", borderLeft: "2px solid", borderLeftColor: green[400]}} >

                <Box p={2} display="flex" alignItems="center"  justifyContent="space-between" >
                    
                    <Typography sx={{textTransform: "capitalize"}} fontWeight={800}>{name}</Typography>
                    <IconButton>
                    <Avatar> <VisibilityRounded />  </Avatar>
                    </IconButton>
                
                </Box>
            </Paper>
        </Box>
    )
}