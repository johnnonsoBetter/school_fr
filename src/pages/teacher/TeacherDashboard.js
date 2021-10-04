import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Chip, Container, Grid, Hidden } from '@mui/material';
import SideNav from '../../components/teacher_dashboard/SideNav';
import Profile from '../../components/teacher_dashboard/Profile';
import UnfinishedScoreReportDraftsContainer from '../../components/teacher_dashboard/home/UnfinishedScoreReportDraftsContainer';
import { SpellcheckRounded } from '@mui/icons-material';


const drawerWidth = 240;

function TeacherDashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
     
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{backgroundColor: "white", boxShadow: "none"}}
      >
          <Container maxWidth="xl" > 
          <Toolbar
            sx={{backgroundColor: "white"}}
          >
          <Box display="flex" width="100%" justifyContent="space-between" >

          <IconButton
            color="success"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <img src="/images/menu.png" width="24px" />
          </IconButton>

            <Box width="100%" display="flex" justifyContent="flex-end">
              
              <Hidden smDown >
                  <Button endIcon={<SpellcheckRounded />} sx={{marginRight: "20px", fontWeight: "bolder", backgroundColor: "#00A6FF", color: "white"}}>Create Draft</Button>
              </Hidden>
              <Hidden smUp >
                  <IconButton sx={{marginRight: "20px", color: "#00A6FF"}} >
                    <SpellcheckRounded />
                  </IconButton>
              </Hidden>
              <Profile />
            </Box>

             
          </Box>
          
        </Toolbar>
        </Container>
      </AppBar>
     
      <Box
        component="nav"
        
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Toolbar />
          <SideNav />
        </Drawer>
        
      </Box>
        <Container maxWidth="xl" > 
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Grid container justifyContent="center"   >
            
            <Hidden mdDown>
              <Grid item xs={2} sm={3} >
                  
                  <SideNav />    
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} >
                <Box  >
                    <Box p={2} >
                      <Typography variant="h4" sx={{fontWeight: "bolder"}} >Unfinished Score Reports</Typography>
                    </Box>
                    <UnfinishedScoreReportDraftsContainer />
                </Box>
            </Grid>
        </Grid>
      </Box>
      </Container>
    </Box>

  );
}

TeacherDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default TeacherDashboard;
