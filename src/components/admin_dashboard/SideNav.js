


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
import { AccessibleRounded, AddRounded, AssignmentRounded, ClassRounded, HomeRounded, MenuBookRounded, SpellcheckRounded } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import TeacherContext from '../../context/teacher/TeacherContext';
import { blue } from '@mui/material/colors';
import AdminContext from '../../context/admin/AdminContext';


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
    borderRadius: "8px"
    
  },
  buttonActive: {
    backgroundColor: blue[100],
    color: "white",
    fontWeight: "bolder"
  }
}))



export default function SideNav({handleDrawerToggle}) {
  const [open, setOpen] = React.useState(false);
  const [openClass, setOpenClass] = React.useState(false);
  const classes = useStyles()
  const {setDrawerOpen, setDrawerChildType} = useContext(AdminContext)
  
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClassClick = () => {
    setOpenClass(!openClass);
  };


  return (
      <>
     
    <List
      sx={{ width: '100%', maxWidth: 270, bgcolor: 'background.paper'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
     
       
        <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}}   activeClassName={window.location.pathname === '/' ? classes.active : ''} component={NavLink} to="/" >
        <ListItemIcon sx={{backgroundColor: "initial"}}>
          <HomeRounded sx={{backgroundColor: "inherit"}} />
        </ListItemIcon>
        <ListItemText sx={{color: "inherit", fontWeight: "inherit"}} primary="Home" />
       
        </Link>

        <ListItemButton onClick={handleClassClick}>
        <ListItemIcon sx={{backgroundColor: "initial"}}>
          <AddRounded sx={{backgroundColor: "inherit"}} />
        </ListItemIcon>
          <ListItemText primary="Creators" />

         
     

      {openClass ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openClass} timeout="auto" unmountOnExit>
        <List component="div" sx={{mb: 1, mt: 1, pl: 1, pr: 1}} disablePadding>
        <Grid justify="center"  container spacing={1} >

        <Grid item xs={12}  >
             
             <Link onClick={handleDrawerToggle} className={classes.link} activeClassName={classes.buttonActive} component={NavLink} to="/create_announcement" >
               <Button fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                   Announcement
               </Button>
             </Link>
           </Grid>

            <Grid item xs={6}  >
             
              <Link onClick={handleDrawerToggle} className={classes.link} activeClassName={classes.buttonActive} component={NavLink} to="/create_student" >
                <Button fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                    Student
                </Button>
              </Link>
            </Grid>

            <Grid item xs={6}  >
              
              <Link onClick={handleDrawerToggle} className={classes.link}  activeClassName={classes.buttonActive} component={NavLink} to="/create_teacher" >
              
              <Button fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                    Teacher
                </Button>
              </Link>
      
            </Grid>

            <Grid item xs={6}  >
              <Button onClick={() => {setDrawerOpen(true); setDrawerChildType('expense')}} fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                   Expense
              </Button>
            </Grid>


            <Grid item xs={6}  >
              <Button onClick={() => {setDrawerOpen(true); setDrawerChildType('bill')}} fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                   Bill Report
              </Button>
            </Grid>

            <Grid item xs={6}  >
              <Button onClick={() => {setDrawerOpen(true); setDrawerChildType('classroom')}} fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                   Classroom
              </Button>
            </Grid>

            <Grid item xs={6}  >
              <Button onClick={() => {setDrawerOpen(true); setDrawerChildType('subject')}} fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                   Subject
              </Button>
            </Grid>


            <Grid item xs={12}  >
              <Button onClick={() => {setDrawerOpen(true); setDrawerChildType('item')}} fullWidth endIcon={<AddRounded />} size="small" variant="outlined">
                   Item
              </Button>
            </Grid>

            

            

            


          </Grid>
        </List>
      </Collapse>

      <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/announcements" >
          <ListItemIcon>
            <img src="/images/bullhorn.png" alt="Announcements" />
          </ListItemIcon>
          <ListItemText primary="Announcement" />
        </Link>
          

        <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/teachers" >
          <ListItemIcon>
            <img src="/images/presentation.png" alt="Teachers" />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </Link>
     

        <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/students" >
          <ListItemIcon>
            <img src="/images/reading.png" alt="Students" />
          </ListItemIcon>
          <ListItemText  primary="Students" />
          </Link>

          <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/classrooms" >
          <ListItemIcon>
            <img src="/images/classroom.png" alt="Classrooms" />
          </ListItemIcon>
          <ListItemText  primary="Classrooms" />
          </Link>

          <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/subjects" >
            <ListItemIcon>
                <img src="/images/education.png" alt="Subjects" />
            </ListItemIcon>
            <ListItemText  primary="Subjects" />
          </Link>

    </List>

    <Divider sx={{ width: '100%', maxWidth: 270 }} />

    <List
      sx={{ width: '100%', maxWidth: 270, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
     
      
     {/* <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/bill_reports" >
            <ListItemIcon>
                <img src="/images/bill.png" alt="Bill Reports" />
            </ListItemIcon>
            <ListItemText  primary="Bill Reports" />
    </Link> */}

    <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/debtors" >
            <ListItemIcon>
                <img src="/images/debt.png" alt="Debtors" />
            </ListItemIcon>
            <ListItemText  primary="Debtors" />
    </Link>

   

       

    </List>

    <Divider sx={{ width: '100%', maxWidth: 270 }} />


    <List
      sx={{ width: '100%', maxWidth: 270, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >

    <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/transactions" >
            <ListItemIcon>
                <img src="/images/transaction.png" alt="Transactions" />
            </ListItemIcon>
            <ListItemText  primary="Transactions" />
    </Link>
     
      
     <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/inventory_activities" >
            <ListItemIcon>
                <img src="/images/inventory.png" alt="Inventory Activities" />
            </ListItemIcon>
            <ListItemText  primary="Inventory Activities" />
    </Link>

    <Link onClick={handleDrawerToggle} className={classes.link} sx={{padding: "10px"}} activeClassName={classes.active} component={NavLink} to="/items" >
            <ListItemIcon>
                <img src="/images/open-box.png" alt="Items" />
            </ListItemIcon>
            <ListItemText  primary="Items" />
    </Link>

    
    

       

    </List>

    </>
  );
}
