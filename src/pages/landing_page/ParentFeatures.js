import React from 'react'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'

export default function ParentFeatures(){


    return (
        <Box mt={4} >
          
            <Grid container justifyContent="space-around" >
            
            

            <Grid xs={12} sm={6} md={6} zeroMinWidth >
                <Box   display="flex" alignItems="center" flexDirection="column" 
                
                sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}  >
                    <Box textAlign="center">
                        <Typography   variant="h4" sx={{textTransform: "capitalize"}} >Parents deserve better communication with the school and a simple Tool to monitor their children academic activities</Typography>
                    </Box>
                   
                </Box>
            </Grid>

            <Grid xs={12} sm={6} md={5} zeroMinWidth >
                <Box >
                    <Box sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}   display="flex" flexDirection="column"  justifyContent="center" alignItems="center" width="100%" >
                        <Paper elevation={3}  >
                        <img src="/images/dashboard_for.png" alt="logo" style={{maxWidth: "100%"}} />
                        </Paper>
                        
                    </Box>
                    
                </Box>
            </Grid>
        </Grid>


        <Box mt={3} >

            <Grid container   >
                
                

                <Grid xs={12} sm={6} md={4} zeroMinWidth >
                    <Box p={1} >
                        <Paper elevation={5} sx={{borderRadius: "10px"}}  >
                            <Box minHeight="200px" position="relative" >
                                    <Box textAlign="center" top={-15} left="90%" position="absolute" > 

                                        <Paper elevation={3} sx={{p: 0.5}} >
                                        <img src="/images/bell.png" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> instant Notifcations </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography > * Bill Notifications </Typography>
                                    </Box>
                                    <Box p={1} ml={2}>
                                        <Typography > * Grade Report Notifications </Typography>
                                    </Box>
                                    <Box p={1} ml={2}>
                                        <Typography > * Behaviour Report Notifications </Typography>
                                    </Box>

                            </Box>
                        </Paper>

                    </Box>
                    
                </Grid>

                <Grid xs={12} sm={6} md={4} zeroMinWidth >
                    <Box p={1}>
                        <Paper elevation={5} sx={{borderRadius: "10px"}}  >
                            <Box minHeight="200px" position="relative" >
                                    <Box textAlign="center" top={-15} left="90%" position="absolute" > 

                                        <Paper elevation={3} sx={{p: 0.5}} >
                                        <img src="/images/test.png" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Grade Reports </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  Quick Access to child grade reports such as exam, test, homework etc </Typography>
                                    </Box>
                                

                            </Box>
                        </Paper>


                    </Box>
                    
                </Grid>


                <Grid xs={12} sm={6} md={4} zeroMinWidth >
                    <Box p={1}>

                    <Paper  elevation={5} sx={{borderRadius: "10px", }}  >
                        <Box minHeight="200px" position="relative" >
                                <Box textAlign="center" top={-15} left="90%" position="absolute" > 

                                    <Paper elevation={3} sx={{p: 0.5}}  >
                                    <img src="/images/consumer-behaviour.png" alt="logo" />
                                    </Paper>
                                
                                </Box>

                                <Box textAlign="center" p={1} >
                                    <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Behaviour Reports </Typography>
                                </Box>

                                <Box p={1} ml={2}>
                                    <Typography sx={{textTransform: "capitalize"}} >  Quick Access to child behaviour reports such as good and bad behaviour in class </Typography>
                                </Box>
                               

                        </Box>
                    </Paper>


                    </Box>
                   
                </Grid>

                <Grid xs={12} sm={6} md={4} zeroMinWidth >
                    <Box p={1} >


                        
                        <Paper elevation={5} sx={{borderRadius: "10px"}}  >
                            <Box minHeight="200px" position="relative" >
                                    <Box textAlign="center" top={-15} left="90%" position="absolute" > 

                                        <Paper elevation={3} sx={{p: 0.5}} >
                                        <img src="/images/bill.png" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Bill Reports </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  Easy Access to child current bills and all payment histories </Typography>
                                    </Box>
                                

                            </Box>
                        </Paper>
                    </Box>
                </Grid>

                <Grid xs={12} sm={6} md={4} zeroMinWidth >
                    <Box p={1} >


                        
                        <Paper elevation={5} sx={{borderRadius: "10px"}}  >
                            <Box minHeight="200px" position="relative" >
                                    <Box textAlign="center" top={-15} left="90%" position="absolute" > 

                                        <Paper elevation={3} sx={{p: 0.5}} >
                                        <img src="/images/calendar (1).png" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Attendance Reports </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  Easy Access to child attendance reports </Typography>
                                    </Box>
                                

                            </Box>
                        </Paper>
                    </Box>
                </Grid>

                <Grid xs={12} sm={6} md={4} zeroMinWidth >
                    <Box p={1} >


                        
                        <Paper elevation={5} sx={{borderRadius: "10px"}}  >
                            <Box minHeight="200px" position="relative" >
                                    <Box textAlign="center" top={-15} left="90%" position="absolute" > 

                                        <Paper elevation={3} sx={{p: 0.5}} >
                                        <img src="/images/best.png" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Report cards </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  Access to child Report cards and print functionality </Typography>
                                    </Box>
                                

                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>

        </Box>


        




        </Box>
        
    )
}