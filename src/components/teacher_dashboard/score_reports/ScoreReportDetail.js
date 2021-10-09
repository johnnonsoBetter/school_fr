
import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import {  BarChartRounded, GppBadRounded, GppGoodRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';

import Menu from '@mui/material/Menu';


import IconButton from '@mui/material/IconButton';
import { Avatar, Divider, Paper, Rating, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { blue, green, red} from '@mui/material/colors';

const Max = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: "rgb(52 183 0 / 93%)"
}));

const Score = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: "rgb(183 0 0 / 93%)"
}));



export default function ScoreReportDetail({theScore}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {max, score_type, remark, score, student} = theScore


  console.log(remark, "this is the same remr")
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Report Info">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
           
            <BarChartRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        PaperProps={{
          elevation: 0,
          style: {
            
            width: '33ch',
            borderRadius: "20px"
          },
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
       <Box p={1} >
            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography > {score_type}</Typography>
                <Rating name="read-only" 
                value={  
                  remark === "excellent" ? 5 : 
                  remark === "very good" ? 4 : 
                  remark === "good" ? 3 : 
                  remark === "poor" ? 2 : 
                  remark === "very poor" ? 1 :  0  } readOnly />
            </Box>
            
            <Box p={1} display="flex" justifyContent="center"  > 
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} >
                    <Score> {score} </Score>
                    <Max > {max} </Max>
                </Stack>
            </Box>

        
            
            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography sx={{textTransform: "capitalize"}} > {remark}</Typography>
                <Avatar sx={
                  {
                    bgcolor: 
                    remark === "excellent" ? green[500] : 
                    remark === "poor" ? red[300] : 
                    remark === "very good" ? blue[500] : 
                    remark === "good" ? blue[300] : 
                    remark === "very poor" ? red[600] : null}} > 
                    
                    {
                    remark === "poor" ? <GppBadRounded /> : 
                    remark === "very poor" ? <GppBadRounded /> :
                    remark === "good" ?  <GppGoodRounded /> :
                    remark === "very good" ? <GppGoodRounded /> :
                    remark === "excellent" ? <GppGoodRounded />: null } </Avatar>
            </Box>

            <Box width="100%" display="flex" p={1} justifyContent="space-between" alignItems="center" >  
                <Typography > {student}</Typography>
                <Avatar  src="/images/nonso.png" />
            </Box>

          
       </Box>
      
      
         
       

      </Menu>
    </React.Fragment>
  );
}
