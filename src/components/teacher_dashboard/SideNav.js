


import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { AccessibleRounded, AssignmentRounded, HomeRounded, MenuBookRounded, SpellcheckRounded } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import TeacherContext from '../../context/teacher/TeacherContext';


const useStyles = makeStyles((theme) => ({
 
  link: {
    color: "#39393a",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    width: "100%"
  },
  active: {
    backgroundColor: "#00A6FF",
    color: "white",
    fontWeight: "bolder",
    borderRadius: "10px"
    


  }
}))



export default function SideNav({handleDrawerToggle}) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles()
  const {subjects} = useContext(TeacherContext).dashboardInfo

  console.log(subjects, "me see")
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
     
       
        <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}}   activeClassName={window.location.pathname === '/' ? classes.active : ''} component={NavLink} to="/" >
        <ListItemIcon sx={{backgroundColor: "initial"}}>
          <HomeRounded sx={{backgroundColor: "inherit"}} />
        </ListItemIcon>
        <ListItemText sx={{color: "inherit", fontWeight: "inherit"}} primary="Home" />
       
        </Link>
        
      

      <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/score_report_drafts" >
          <ListItemIcon>
            <SpellcheckRounded />
          </ListItemIcon>
          <ListItemText primary="Score Drafts" />
        </Link>
     

        <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/behaviour_reports" >
          <ListItemIcon>
            <AccessibleRounded />
          </ListItemIcon>
          <ListItemText  primary="Behaviour Reports" />
          </Link>
        
    



      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AssignmentRounded />
        </ListItemIcon>
        <ListItemText primary="Score Reports" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {
            subjects.map((sub) => {

              return (
                <Link key={sub.id} onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px", paddingLeft: "32px"}} activeClassName={classes.active} component={NavLink} to={`/score_reports/${sub.id}`} >
                  <ListItemIcon>
                  <MenuBookRounded />
                  </ListItemIcon>
                  <ListItemText sx={{textTransform: "capitalize"}} primary={sub.name} />
                </Link>

              )
            })
          }

        
         

       


      

          
        </List>
      </Collapse>
    </List>
  );
}