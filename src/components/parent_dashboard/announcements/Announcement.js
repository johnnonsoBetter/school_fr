import { CancelOutlined, EditRounded } from '@mui/icons-material'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { deepOrange, orange, red } from '@mui/material/colors'
import React from 'react'

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
                        height: "calc(98vh - 200px)",
                        borderRadius: "15px",
                        position: "relative"
                    }}
                     >

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


