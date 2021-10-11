import { Box, Grid } from '@mui/material'
import React from 'react'
import Empty from '../../utilities/Empty'
import ScoreReportItem from './ScoreReportItem'


export default function ScoreReports(props){

    const {scores} = props

   
    
    return (

        <Box maxHeight="calc(100vh - 180px)" overflow="auto"  >


            {
                scores.length === 0 ?
                <Empty message="No Score Report Found" height="calc(90vh - 200px)" /> :

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

            }
           

            


        </Box>

        

    )
}

