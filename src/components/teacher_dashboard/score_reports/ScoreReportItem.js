import { Box, Paper, Typography } from '@mui/material'
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


export default  function ScoreReportItem (props){

    const {score} = props
    return (
       

        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography sx={{fontWeight: "bold"}}> {score.student} </Typography>

                    
                    <Box display="flex" alignItems="center" >
                       
                        <Score >{score.score}</Score>
                        <Max>{score.max}</Max>

                    
                        <ScoreReportDetail theScore={score} />

                    </Box>
                    
                  
                </Box>

            </Paper>
        </Box>
    )
}

