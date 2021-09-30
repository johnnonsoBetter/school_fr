import { Grid } from '@mui/material'
import React from 'react'
import BehaviourReport from './BehaviourReport'


export default function BehaviourReportList(props){
    const {behaviourReports} = props
    return (
        <Grid container rowGap={2} columnSpacing={1} >
           
            {
                behaviourReports.map((behaviourReport) => {

                    return (
                        <Grid item xs={12} sm={6} key={behaviourReport.id} >
                            <BehaviourReport behaviourReport={behaviourReport} />
                        </Grid>
        
                    )

                })
            }

            
        </Grid>
    )
}