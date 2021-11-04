


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
import { AccessibleRounded, AssignmentRounded, BookmarkAddedRounded, ClassRounded, HomeRounded, MenuBookRounded, SpellcheckRounded } from '@mui/icons-material';
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



export default function SideNav(props) {
  const [open, setOpen] = React.useState(false);
  const [openClass, setOpenClass] = React.useState(false);
  const [openAttendanceClass, setOpenAttendanceClass] = React.useState(false);
  const classes = useStyles()
  const {classrooms, myClassrooms, subjects} = useContext(TeacherContext).dashboardInfo 
  const {dashboardInfo, setDashboardInfo} = useContext(TeacherContext) 
  const {handleDrawerToggle} = props


  console.log(subjects, "me see")
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClassClick = () => {
    setOpenClass(!openClass);
  };

  const handleAttendanceClassClick = () => {
    setOpenAttendanceClass(!openAttendanceClass);
  };


  return (
    <List
      sx={{ width: '100%', maxWidth: 270, bgcolor: 'background.paper' }}
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

          <ListItemButton onClick={handleClassClick}>
        <ListItemIcon>
          <ClassRounded />
        </ListItemIcon>
        <ListItemText primary="My Classrooms" />
        {openClass ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openClass} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {
            classrooms.map((sub) => {

              return (
                <Link key={sub.id} onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px", paddingLeft: "32px"}} activeClassName={classes.active} component={NavLink} to={`/classrooms/${sub.id}`} >
                  <ListItemIcon>
                  <ClassRounded />
                  </ListItemIcon>
                  <ListItemText sx={{textTransform: "capitalize"}} primary={sub.name} />
                </Link>

              )
            })
          }
 
        </List>
      </Collapse>
        
    



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
                  <AssignmentRounded />
                  </ListItemIcon>
                  <ListItemText sx={{textTransform: "capitalize"}} primary={sub.name} />
                </Link>

              )
            })
          }

 

          
        </List>
      </Collapse>
          
           
            {
            myClassrooms.length !== 0 &&

            <>
            <ListItemButton onClick={handleAttendanceClassClick}>
              <ListItemIcon>
                <BookmarkAddedRounded />
              </ListItemIcon>
              <ListItemText primary="Take Attendance" />
              {openAttendanceClass ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openAttendanceClass} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                {
                  myClassrooms.map((classroom) => {

                    return (
                      <Link key={classroom.id} onClick={() => {
                        const newDashboardInfo = Object.assign({}, dashboardInfo)

                       newDashboardInfo.classroom = classroom.name

                        
                        setDashboardInfo(newDashboardInfo)
                        handleDrawerToggle()
                      }} className={classes.link} sx={{padding: "10px", paddingLeft: "32px"}} activeClassName={classes.active} component={NavLink} to={`/attendances/${classroom.id}`} >
                        <ListItemIcon>
                        <BookmarkAddedRounded />
                        </ListItemIcon>
                        <ListItemText sx={{textTransform: "capitalize"}} primary={classroom.name} />
                      </Link>

                    )
                  })
                  
                }
                

              </List>

            </Collapse>
            
            </>
            }
          
    </List>
  );
}
