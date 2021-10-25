import { Box, createTheme, Paper, ThemeProvider, Typography } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors';
import React from 'react'
import { AuthContext } from '../../../context/AuthContext';

const theme = createTheme({
    typography: {
      fontFamily: [
        'Kanit', 'sans-serif',
      ].join(','),
    },
  });
  

export default function WellcomeMessage(){

    const {logUserOut, authState} = React.useContext(AuthContext)
    const {first_name, last_name} = JSON.parse(authState.userInfo)

    return (
        <Box mb={2}>
            <ThemeProvider theme={theme} >
                <Box display="flex" borderRadius={2} alignItems="center" p={2} sx={{backgroundColor: blueGrey[100], height: "120px"}} >
                   <Typography fontWeight="bolder" variant="h4" sx={{textTransform: "capitalize"}} >
                       Welcome {first_name} {last_name}
                   </Typography>
                   <Box sx={{ml: 2}} >
                       <img src="/images/clapping.png" alt="clapping" style={{width: "50px", maxWidth: "100%"}} />
                   </Box>
               </Box>

            </ThemeProvider>
           
              
          
        </Box>
    )
}