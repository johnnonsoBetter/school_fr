import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.h3,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));







export default  function ScoreReportItem (){


    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box sx={{width: '100%', padding: "10px"}}  >
                    <Typography >Homework</Typography>
                    <Box  display="flex" justifyContent="center">
                    <Stack direction={{ xs: 'row' }} >
                        <Item> 10</Item>
                        <Item> 20</Item>
                    
                    </Stack>

                    </Box>
                    <Typography >Poor</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

