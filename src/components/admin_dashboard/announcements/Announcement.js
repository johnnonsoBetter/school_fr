import { CancelOutlined, EditRounded } from '@mui/icons-material'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { deepOrange, orange, red } from '@mui/material/colors'
import React from 'react'
import DeleteAnnouncement from './DeleteAnnouncement'
import EditAnnouncement from './EditAnnouncement'

export default function Announcement(props) {
    const {announcement, setAnnouncements, announcements} = props

    
    return (
        <Box p={2} display="flex" justifyContent="center"  width="100%">

                <Paper 
                    style={{  
                        backgroundImage: "url(" + `${announcement.image}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                    elevation={5} 
                    sx={{
                        width: "100%", 
                        height: "calc(97vh - 200px)",
                        borderRadius: "15px",
                        position: "relative"
                    }}
                     >


                    <Box position="absolute" display="flex" zIndex={1000} top={0} right={1} >
                       
                       
                       <EditAnnouncement />
                       <DeleteAnnouncement announcement={announcement} setAnnouncements={setAnnouncements} announcements={announcements}  />

                    </Box>
                  
                    <Box

                    sx={{ 
                        alignItems: 'center',
                        color: "white", 
                        borderRadius: "15px", 
                        display: 'flex', 
                         height: "100%",
                         width: "100%",
                        justifyContent: 'center',
                        backgroundColor: "rgba(0, 0, 0, 0.39);", 
                        backdropFilter: "blur(2px)"
                    }} 
                    
                    >

                        <Box width="80%">
                            <Typography variant="h4" textAlign="center" fontWeight="bolder"> {announcement.message} </Typography>

                        </Box>
                    
                    </Box>
                   
                </Paper>
        </Box>
    )
}


