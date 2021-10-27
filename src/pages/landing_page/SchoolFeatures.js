import React from 'react'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'

export default function SchoolFeatures(){


    return (
        <Box mt={4} >
          
            <Grid container justifyContent="space-around" >
            
            

            <Grid xs={12} sm={6} md={6} zeroMinWidth >
                <Box   display="flex" alignItems="center" flexDirection="column" 
                
                sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}  >
                    <Box textAlign="center">
                        <Typography   variant="h4" sx={{textTransform: "capitalize"}} >Schools need better ways to organise and efficiently manage all its curicular activities  </Typography>
                    </Box>
                   
                </Box>
            </Grid>

            <Grid xs={12} sm={6} md={5} zeroMinWidth >
                <Box >
                    <Box sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}   display="flex" flexDirection="column"  justifyContent="center" alignItems="center" width="100%" >
                        <Paper elevation={5} sx={{transformOrigin: "right",  maxHeight: "300px", transform: "perspective(1200px) rotateY(-9deg)", transition: ".55s"}}  >
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
                                        <img src="/images/debt (1).png" width="32px" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Debtor Trackers </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography > * Tracks all students debts and its payment histories  </Typography>
                                    </Box>
                                    <Box p={1} ml={2}>
                                        <Typography > * Easily Recover debts  </Typography>
                                    </Box>
                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  * Send push notifications to debtor's parents </Typography>
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
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}>Reliable Record Keeper </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} > *  Securly store and retrieve all students records such as grades, bill reports, behaviour reports, report cards, attendance reports </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} > * Securly store and retrieve all teachers activities </Typography>
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
                                    <img src="/images/bill.png" alt="logo" />
                                    </Paper>
                                
                                </Box>

                                <Box textAlign="center" p={1} >
                                    <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Bill Generator </Typography>
                                </Box>

                                <Box p={1} ml={2}>
                                    <Typography sx={{textTransform: "capitalize"}} >  * Easily Generate new bill for students </Typography>
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
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Automated Reported Cards </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} > *  Generate Report cards with just a click without any hassle </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} > *  Print Report cards at any moment or time </Typography>
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
                                        <img src="/images/inventory.png" alt="logo" />
                                        </Paper>
                                    
                                    </Box>

                                    <Box textAlign="center" p={1} >
                                        <Typography variant="h5" sx={{textTransform: "uppercase"}} fontWeight={700}> Inventory Management </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  * Track expenses </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  * Track products such as books, pen, uniforms stock </Typography>
                                    </Box>
                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  * Track products sales </Typography>
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