import { Box, Typography } from '@mui/material'
import React from 'react'

export default function FailedFetch({message, height}){


    return (
        <Box sx={{ flexGrow: 1 , height: height, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography> {message} </Typography>
        </Box>
    )
}