import { AccessibleForwardRounded, NotificationAddRounded } from '@mui/icons-material'
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material'
import { blue, orange } from '@mui/material/colors'
import React from 'react'
import CreateBehaviourReport from './CreateBehaviourReport'


export default function Student(props){

    const {full_name, id} = props.student

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} sx={{borderRadius: "9px"}} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    
                    
                    <Box display="flex" alignItems="center" >

                      <Box display="flex" alignItems="center" >
                          <Avatar src="/images/nonso.png" />
                          <Typography sx={{marginLeft: "10px"}}>{full_name}</Typography>

                      </Box>

                       
                    </Box>

                    
                       <CreateBehaviourReport full_name={full_name} id={id} />
                       
                       
                    
                  
                </Box>

            </Paper>
        </Box>
    )
}