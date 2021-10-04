


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
import { Link } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
 
  link: {
    color: "#39393a",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    width: "100%"
  }
}))



export default function SideNav() {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles()

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      <ListItemButton  >
       
        <Link className={classes.link} component={NavLink} to="/sdf" >
        <ListItemIcon>
          <HomeRounded />
        </ListItemIcon>
        <ListItemText primary="Home" />
        </Link>
        
      </ListItemButton>
      <ListItemButton>

      <Link className={classes.link} component={NavLink} to="/sdf" >
          <ListItemIcon>
            <SpellcheckRounded />
          </ListItemIcon>
          <ListItemText primary="Score Drafts" />
        </Link>
        
      </ListItemButton>

      <ListItemButton>

        <Link className={classes.link} component={NavLink} to="/sdf" >
          <ListItemIcon>
            <AccessibleRounded />
          </ListItemIcon>
          <ListItemText primary="Behaviour Reports" />
          </Link>
        
      </ListItemButton>



      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AssignmentRounded />
        </ListItemIcon>
        <ListItemText primary="Score Reports" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <MenuBookRounded />
            </ListItemIcon>
            <ListItemText primary="Mathematics" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <MenuBookRounded />
            </ListItemIcon>
            <ListItemText primary="English" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <MenuBookRounded />
            </ListItemIcon>
            <ListItemText primary="Economics" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <MenuBookRounded />
            </ListItemIcon>
            <ListItemText primary="Physics" />
          </ListItemButton>
          
        </List>
      </Collapse>
    </List>
  );
}
