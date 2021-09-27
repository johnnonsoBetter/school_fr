import { Box, Grid } from '@mui/material'
import React from 'react'
import ScoreReportItem from './ScoreReportItem'


export default function ScoreReports({subject}){


    return (

        <Box  >
           

            <Grid container >
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <ScoreReportItem />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <ScoreReportItem />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <ScoreReportItem />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <ScoreReportItem />
                </Grid>
            </Grid>


        </Box>

        

    )
}

