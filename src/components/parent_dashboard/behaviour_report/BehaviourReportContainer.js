import { Box } from '@mui/material'
import React from 'react'
import TheDate from '../score_report/TheDate'
import BehaviourReportList from './BehaviourReportList'

export default function BehaviourReportContainer(){

    return (
        <Box >
            <Box display="flex" justifyContent="flex-end"  >
                <TheDate />
            </Box>
            <BehaviourReportList />

        </Box>
    )

}