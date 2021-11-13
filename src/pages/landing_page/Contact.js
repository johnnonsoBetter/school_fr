import { Box, Grid, Typography } from '@mui/material'
import { Mail, Phone } from '@mui/icons-material'
import React from 'react'

function Contact(){

    return (
        <Box marginTop={2} p={3}>
            <Box textAlign="center" >
                <Typography variant="h4" style={{color: "black"}}> Contact Us </Typography>
            </Box>

            <Box marginTop={2}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" >
                    <Grid item xs={12} md={4}  >
                        <Box  p={1} display="flex" justifyContent="center"  alignItems="center" >
                        <Box display="flex"  width="20px" sx={{mr: 1}} ><img style={{maxWidth: "100%"}} src="/images/phone.png" alt="phone" /></Box>
                            <Typography variant="h5"  style={{color: "black", fontWeight: "500"}} >   <a  style={{color: "black", textDecoration: "none"}} href="tel:+2349039691334">+2349039691334</a> </Typography>
                            
                        </Box>
                    </Grid> 

                    <Grid item xs={12} md={4}  >
                        <Box  p={1} display="flex" justifyContent="center"  alignItems="center" >
                        <Box display="flex"  width="20px" sx={{mr: 1}} ><img style={{maxWidth: "100%"}} src="/images/whatsapp.png" alt="phone" /></Box>
                            <Typography variant="h5"  style={{color: "black", fontWeight: "500"}} >   <a  style={{color: "black", textDecoration: "none"}} href="tel:+2347068448786">+2347068448786</a> </Typography>
                            
                        </Box>
                    </Grid> 

                    
                    <Grid item xs={12} md={4}  >
                        <Box  p={1} display="flex" justifyContent="center" alignItems="center" >
                            <Box display="flex" width="20px"   sx={{mr: 1}} ><img style={{maxWidth: "100%"}} src="/images/gmail.png" alt="email" /></Box>
                            
                            <Typography variant="h5"  style={{color: "black", fontWeight: "500"}} >   <a  style={{color: "black", textDecoration: "none"}} href="mailto:confamgroup@gmail.com">confamgroup@gmail.com</a> </Typography>
                                                                                
                        </Box>
                    </Grid>  

                   

                   

                     
                </Grid>
            </Box>


        </Box>
    )
}

export default Contact