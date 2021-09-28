import { Box, Grid } from '@mui/material'
import React from 'react'
import BehaviourReport from './BehaviourReport'


export default function BehaviourReportList(){

    return (
        <Grid container rowGap={2} columnSpacing={1} >
            <Grid item xs={12} sm={6} >
                <BehaviourReport />
            </Grid>

            <Grid item xs={12} sm={6} >
                <BehaviourReport />
            </Grid>

            <Grid item xs={12} sm={6} >
                <BehaviourReport />
            </Grid>

            <Grid item xs={12} sm={6} >
                <BehaviourReport />
            </Grid>

            <Grid item xs={12} sm={6} >
                <BehaviourReport />
            </Grid>
        </Grid>
    )
}