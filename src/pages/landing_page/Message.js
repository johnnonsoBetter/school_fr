import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { HashLink } from 'react-router-hash-link'


export default function Message(){


    return (
      

        <Grid container justifyContent="space-around" >
            
            

            <Grid xs={12} sm={6} md={6} zeroMinWidth >
                <Box   display="flex" alignItems="center" flexDirection="column" 
                
                sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}  >
                    <Box textAlign="center">
                        <Typography  fontWeight={900} variant="h3" sx={{textTransform: "capitalize"}} >A Modern school management software that  take away pains!</Typography>
                    </Box>
                    <Box  width="100%" mt={3} display="flex" justifyContent="center" >
                        <Stack direction="row" spacing={2}>
                           
                            <HashLink  style={{textDecoration: "none"}} smooth to={'/#school-f'}>
                                <Button color="warning" variant="outlined" size="large"> Schools </Button>
                            </HashLink>

                            <HashLink  style={{textDecoration: "none"}} smooth to={'/#parent-f'}>
                                <Button color="success" variant="outlined" size="large"> Parents </Button>
                            </HashLink>

                            <HashLink  style={{textDecoration: "none"}} smooth to={'/#teacher-f'}>
                                <Button color="info" variant="outlined" size="large"> Teachers </Button>
                            </HashLink>
                        </Stack>
                    </Box>
                </Box>
            </Grid>

            <Grid xs={12} sm={6} md={5} zeroMinWidth >
                <Box >
                    <Box sx={{justifyContent: {md: "center"}, mt: {xs: 5, sm: 5, lg: 1}}}   display="flex" flexDirection="column"  justifyContent="center" alignItems="center" width="100%" >
                        <Paper elevation={3}  >
                        <img src="/images/dashboard_for.png" alt="logo" style={{maxWidth: "100%"}} />
                        </Paper>
                        
                    </Box>
                    
                </Box>
            </Grid>
        </Grid>
    )
}