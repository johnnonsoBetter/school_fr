import { Box, Grid } from '@mui/material'
import React from 'react'
import ScoreReportItem from './ScoreReportItem'


export default function ScoreReports(props){

    const {scores} = props

   
    return (

        <Box  >
           

            <Grid container >
                
                
                {
                   scores.map((score) => {
                       
                        return (
                            <Grid key={score.id} item xs={12} sm={6} zeroMinWidth >
                                <ScoreReportItem score={score}  />
                            </Grid>
                        )
                    })
                }
               
                
            </Grid>


        </Box>

        

    )
}

