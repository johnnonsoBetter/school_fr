import { Box, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import ScoreReportDetail from './ScoreReportDetail';

const Max = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: "rgb(52 183 0 / 93%)"
}));

const Score = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: "rgb(183 0 0 / 93%)"
}));


export default  function ScoreReportItem (){


    return (
       

        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography sx={{fontWeight: "bold"}}> HomeWork </Typography>

                    
                    <Box display="flex" alignItems="center" >
                       
                        <Score >30</Score>
                        <Max>40</Max>

                    
                        <ScoreReportDetail />

                    </Box>
                    
                  
                </Box>

            </Paper>
        </Box>
    )
}

