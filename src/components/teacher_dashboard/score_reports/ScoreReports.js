import { Box, Grid } from '@mui/material'
import React from 'react'
import ScoreReportItem from './ScoreReportItem'


export default function ScoreReports(props){

    const {scores} = props

    console.log("my own scores ",scores)
    
    return (

        <Box maxHeight="calc(100vh - 180px)" overflow="auto"  >
           

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

