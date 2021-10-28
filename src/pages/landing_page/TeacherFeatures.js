import React from 'react'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'

export default function TeacherFeatures(){


    return (
        <Box mt={4} >
          
            <Grid container justifyContent="space-around" alignItems="center" >
            
            

            <Grid xs={12} sm={6} md={6} zeroMinWidth >
                <Box   display="flex" alignItems="center" flexDirection="column" 
                
                sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}  >
                    <Box textAlign="center">
                        <Typography   variant="h4" sx={{textTransform: "capitalize"}} >Teachers are educators and they need simple but yet powerful tool to make their task easier</Typography>
                    </Box>
                   
                </Box>
            </Grid>

            <Grid xs={12} sm={6} md={5} zeroMinWidth >
                <Box >
                    <Box sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}   display="flex" flexDirection="column"  justifyContent="center" alignItems="center" width="100%" >
                        <Paper elevation={0} sx={{transformOrigin: "right",  transform: "perspective(1200px) rotateY(-9deg)", transition: ".55s"}}  >
                        <img src="/images/teacher_dashboard.png" alt="logo" style={{maxWidth: "100%"}} />
                        </Paper>
                        
                    </Box>
                    
                </Box>
            </Grid>
        </Grid>


        <Box mt={3} >

            <Grid container   >
                
                

              

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
                                        <Typography sx={{textTransform: "capitalize"}} >  * Ability to easily grade a child  </Typography>
                                    </Box>

                                    <Box p={1} ml={2}>
                                        <Typography sx={{textTransform: "capitalize"}} >  * Ability to access all students scores in a given classroom  </Typography>
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
                                    <Typography sx={{textTransform: "capitalize"}} > * Ability to report child behaviour to the parent  </Typography>
                                </Box>

                                <Box p={1} ml={2}>
                                    <Typography sx={{textTransform: "capitalize"}} > * Access to a child's behaviour report in a given class  </Typography>
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
                                        <Typography sx={{textTransform: "capitalize"}} >  Provides a means for classroom teachers to mark attendance record of a child </Typography>
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