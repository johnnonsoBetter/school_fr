import { Box, Grid } from '@mui/material'
import React from 'react'
import Bill from './Bill'



export default function BillContainer(){


    return (
        <Box >
    
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: "calc(95vh - 200px)",
                }}
            >
                <Grid container >
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
                <Grid item xs={12} sm={6} zeroMinWidth >
                    <Bill />
                </Grid>
               
            </Grid>




            </Box>
            

        </Box>
    )
}


