import { VisibilityOutlined, VisibilityRounded } from '@mui/icons-material'
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material'
import { blue, green } from '@mui/material/colors'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Classroom(props){
    const {name, id} = props.classroom
    const {pathname} = useLocation()
    return (
        <Box width="100%" sx={{padding: "5px"}} >

            <Paper elevation={2} sx={{borderRadius: "5px", borderLeft: "2px solid", borderLeftColor: green[400]}} >

            <Box p={2} display="flex" alignItems="center"  justifyContent="space-between" >
                
                <Typography sx={{textTransform: "capitalize"}} fontWeight={800}>{name}</Typography>
                <Link to={`${pathname}/${id}/?`} >
                    <Avatar variant="rounded" sx={{bgcolor: blue[300]}} sx={{ width: 24, height: 24 }} >  <VisibilityOutlined fontSize="small"  /> </Avatar>
                </Link>
              
              
            </Box>
            </Paper>
        </Box>
    )
}