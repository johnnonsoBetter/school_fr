import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Aim(){


    return (

        <Box p={1} >
            <Box  >
                <Typography variant="h5" fontWeight="bolder"  >Why Confamsch</Typography>
            </Box>
            
            <Box mt={2} >
                <Grid container >
                   

                    <Grid item xs={12} sm={6} >
                        <Box  >
                            <Typography variant="h6" fontWeight="bolder"  >The Problem:</Typography>
                        </Box>
                        <Box >
                            <Typography variant="h6"   >

                                Poor, error-prone, and cost ineffectiveness of recording and sharing information in school systems mostly in Nigeria has become a pandemic, thereby reducing the productivity of schools, Some existing solutions have already solved part of these problems. by providing the behavioral reports, attendance reports, report cards, score reports.
                                Big important factors such as usability, simplicity, accessibility, good support are still issues.
                                As former members of the primary and secondary school settings, we have experienced firsthand the ineffectiveness to access and record information and we are set to make a change.


                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Box  >
                            <Typography variant="h6" fontWeight="bolder"  >The Solution:</Typography>
                        </Box>
                        <Box >
                            <Typography variant="h6"   >

                            Our software is a PWA application that runs on most mobile devices and computers and aims to simplify the major processes in running a school
                            We aim to solve most of these problems by not only creating a solution that solves academic problems but one that is simple, yet comprehensive.
                            Leveraging powerful web concepts such as PWA, to increase speed and reliability. 
                            With our software, you just need to use it as an app either on your phone or computer, without worrying about going to app stores or downloading. JUST USE.
                            Most importantly our software is affordable so as to encourage widespread adoption. We want you to be a part of this journey.

                            </Typography>
                        </Box>
                    </Grid>
                </Grid>


            </Box>
            
        </Box>
    )
}