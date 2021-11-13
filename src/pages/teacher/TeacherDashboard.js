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
import { Backdrop, Button, Chip, CircularProgress, Container, Grid, Hidden } from '@mui/material';
import SideNav from '../../components/teacher_dashboard/SideNav';
import Profile from '../../components/teacher_dashboard/Profile';
import UnfinishedScoreReportDraftsContainer from '../../components/teacher_dashboard/home/UnfinishedScoreReportDraftsContainer';
import { SpellcheckRounded } from '@mui/icons-material';
import HeaderToolBar from '../../components/teacher_dashboard/HeaderToolBar';
import Home from '../../components/teacher_dashboard/home/Home';
import SideDrawer from '../../components/teacher_dashboard/SideDrawer';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ScoreReportDraftContainer from '../../components/teacher_dashboard/score_report_drafts/ScoreReportDraftContainer';
import ScoreReportContainer from '../../components/teacher_dashboard/score_reports/ScoreReportContainer';
import BehaviourReportContainer from '../../components/teacher_dashboard/behaviour_reports/BehaviourReportContainer';
import { TeacherContextProvider } from '../../context/teacher/TeacherContext';
import { FetchContext, FetchProvider } from '../../context/FetchContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import CreateScoreReportDraft from '../../components/teacher_dashboard/CreateScoreReportDraft'
import EditScoreDraftReportContainer from '../../components/teacher_dashboard/edit_score_report_draft/EditScoreDraftReportContainer';

import MySnackbar from '../../components/utilities/MySnackbar';
import ClassroomStudentContainer from '../../components/teacher_dashboard/classroom/ClassroomStudentContainer';
import AttendanceContainer from '../../components/teacher_dashboard/attendance/AttendanceContainer';


const drawerWidth = 240;

function TeacherDashboard(props) {
 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const {authAxios} = useContext(FetchContext)
  const history = useHistory()
  const location = useLocation()
  const routeMatch = useRouteMatch()
  const [openSnack, setOpenSnack] = useState(false)
  const [snackInfo, setSnackInfo] = useState({
    message: '',
    severity: ''
  })
  
  const [dashboardInfo, setDashboardInfo] = useState({
    unfinishedDrafts: [],
    subjects: [],
    termDates: [],
    scoreTypes: [],
    classrooms: [],
    myClassrooms: [],
    fullName: null,
    classroom: null,

  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickOpen = () => {
    
    history.push('#create')

    setOpen(true);
  
   
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {

    window.document.title = "Teacher"


    authAxios.get('api/v1/teacher_dashboards').then((res) => {
     

      const {score_report_drafts, score_types, subjects, term_dates, teacher, classrooms, my_classrooms} = res.data 
      const newDashboardInfo = Object.assign({}, dashboardInfo)

      newDashboardInfo.unfinishedDrafts = score_report_drafts
      newDashboardInfo.termDates = term_dates
      newDashboardInfo.fullName = teacher.full_name 
      newDashboardInfo.scoreTypes = score_types
      newDashboardInfo.subjects = subjects
      newDashboardInfo.classrooms = classrooms
      newDashboardInfo.myClassrooms = my_classrooms

      
      setDashboardInfo(newDashboardInfo)
      setLoading(false)
     

    }).catch((err) => {
      console.log(err.response)
      // if(err.response.status === 401){
      //    history.push('/login')
      // }

    })

    

    return () => {

    }
  }, [])


  

  useEffect(() => {
    if (window.location.hash  === "#create"){
      setOpen(true);
    }else{
      setOpen(false)
    }
    
  }, [routeMatch])





  
  return (
     <TeacherContextProvider
     
      value={{
        dashboardInfo: dashboardInfo,
        handleClickOpen,
        handleClose,
        open,
        openSnack,
        snackInfo,
        setOpenSnack: (op) => setOpenSnack(op),
        setSnackInfo: (info) => {
          setSnackInfo(info)
        },
        setDashboardInfo: (dashboardInfo) => {
          setDashboardInfo(dashboardInfo)
        }
      }}
     >

      {

        loading ? 
        <Backdrop
          sx={{ backgroundColor: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          
        >
          
          <div class="loadingio-spinner-wedges-ms9m8n0rjb9"><div class="ldio-cmgfr111trf">
          <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
        </div></div>
       
        </Backdrop>
      :
     
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <MySnackbar setOpenSnack={setOpenSnack} openSnack={openSnack} snackInfo={snackInfo} />
      
      
      <CreateScoreReportDraft />
    
      <AppBar
        position="fixed"
        sx={{backgroundColor: "white", boxShadow: "none"}}
      >
          <Container maxWidth="xl" > 
          <HeaderToolBar handleDrawerToggle={handleDrawerToggle}/>
        </Container>
      </AppBar>
     
      <Box
        component="nav"
        aria-label="mailbox folders"
      >
        
        <SideDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
        
      </Box>
        <Container maxWidth="xl" > 
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Grid container justifyContent="center"   >
            
            <Hidden lgDown>
              <Grid item xs={2} sm={3} >
                  
                  <SideNav handleDrawerToggle={handleDrawerToggle}/>    
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} lg={8} >
                <Switch >
                <Route exact  path="/attendances/:classroom_id" render={()=> (<AttendanceContainer />)} />
                  <Route exact  path="/classrooms/:id" render={()=> (<ClassroomStudentContainer />)} />
                  <Route  exact path="/score_report_drafts/:id" render={()=> (<EditScoreDraftReportContainer />)} />
                  <Route  path="/score_report_drafts" render={()=> (<ScoreReportDraftContainer />)} />
                  <Route  path="/behaviour_reports" render={()=> (<BehaviourReportContainer />)} />
                  <Route exact path="/score_reports/:id" render={()=> (<ScoreReportContainer />)} />

                  <Route path="/" render={()=> (<Home />)} /> 
                </Switch>
          
            </Grid>
        </Grid>
      </Box>
      </Container>
     
    </Box>

      }
    </TeacherContextProvider>

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
