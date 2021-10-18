import { Box, Grid } from '@mui/material'
import React from 'react'
import Subject from './Subject'

export default function SubjectList(props) {
    const {subjects} = props
    return (
        <Box >
            <Grid container >
                {
                    subjects.map((subject) => {

                        return (
                            <Grid key={subject.id} item xs={12} sm={6} md={4} >
                                <Subject subject={subject} />            
                            </Grid>
                        )
                    })
                }
            </Grid>
                
            </Box>
    )
}