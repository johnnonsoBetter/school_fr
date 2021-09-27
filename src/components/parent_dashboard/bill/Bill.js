import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import React from 'react'

export default function Bill(){

    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                    <Chip label="Paid" variant="outlined" />
                    <Typography> Food Practical </Typography>
                </Box>

                <Box display="flex" justifyContent="space-around" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                    <Box >
                        <Typography> ₦4,000</Typography>
                        <Typography> amount </Typography>
                    </Box>
                    <Box >
                        <Typography> ₦4,000</Typography>
                        <Typography> amount </Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="flex-end" sx={{width: '100%', padding: "10px"}} >
                    <Typography> 2 days ago  </Typography>
                </Box>
                <Box >
                    <Button fullWidth > Payment Info </Button>
                </Box>

            </Paper>
        </Box>
    )
}