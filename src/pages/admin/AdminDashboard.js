import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Backdrop, Button, Chip, CircularProgress, Container, Grid, Hidden } from '@mui/material';


import Home from '../../components/admin_dashboard/home/Home';
import SideDrawer from '../../components/admin_dashboard/SideDrawer';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { AdminContextProvider } from '../../context/admin/AdminContext';
import { FetchContext, FetchProvider } from '../../context/FetchContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import MySnackbar from '../../components/utilities/MySnackbar';
import SideNav from '../../components/admin_dashboard/SideNav';
import HeaderToolBar from '../../components/admin_dashboard/HeaderToolBar';
import InventoryContainer from '../../components/admin_dashboard/inventory_activities/InventoryContainer';
import TransactionContainer from '../../components/admin_dashboard/transaction_activities/TransactionContainer';
import ItemContainer from '../../components/admin_dashboard/items/ItemContainer';
import DebtorContainer from '../../components/admin_dashboard/debtors/DebtorContainer';
import BillReportContainer from '../../components/admin_dashboard/bill_reports/BillReportContainer';
import SubjectContainer from '../../components/admin_dashboard/subjects/SubjectContainer';
import ClassroomContainer from '../../components/admin_dashboard/classrooms/ClassroomContainer';
import TeacherContainer from '../../components/admin_dashboard/teachers/TeacherContainer';
import StudentContainer from '../../components/admin_dashboard/students/StudentContainer';
import SettingContainer from '../../components/admin_dashboard/settings/SettingContainer';
import CreateTeacherContainer from '../../components/admin_dashboard/create_teacher/CreateTeacherContainer';
import CreateStudentContainer from '../../components/admin_dashboard/create_student/CreateStudentContainer';
import ClassroomInfoContainer from '../../components/admin_dashboard/classrooms/classroominfo/ClassroomInfoContainer';
import SubjectInfoContainer from '../../components/admin_dashboard/subjects/subject_info/SubjectInfoContainer';
import DebtBillContainer from '../../components/admin_dashboard/debtors/debt_bills/DebtBillContainer';
import StudentInfoContainer from '../../components/admin_dashboard/students/student_info/StudentInfoContainer';
import CreateActivityDrawer from '../../components/admin_dashboard/CreateActivityDrawer';
import AnnouncementContainer from '../../components/admin_dashboard/announcements/AnnouncementContainer';
import CreateAnnouncementContainer from '../../components/admin_dashboard/announcements/CreateAnnouncementContainer';


const drawerWidth = 240;

function AdminDashboard(props) {
 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerChildType, setDrawerChildType] = useState('')
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
      teachers: [],
      scoreTypes: [],
      termDates: [],
    // scoreTypes: [],
       classrooms: [],
    // fullName: null,

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

    setLoading(false)

    window.document.title = "Admin"

  
    

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
     <AdminContextProvider
     
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
        },
        drawerOpen,
        drawerChildType,
        setDrawerOpen: (open) => {
          setDrawerOpen(open)
        },
        setDrawerChildType: (type) => {
          setDrawerChildType(type)
        }
      }}
     >

      {

        loading ? 
        <Backdrop
          sx={{ backgroundColor: "rgba(32, 38, 45, 0.2)", backdropFilter: "blur(2px)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      :
     
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MySnackbar setOpenSnack={setOpenSnack} openSnack={openSnack} snackInfo={snackInfo} />
      
       <CreateActivityDrawer />
     
    
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
                  
                  <SideNav />    
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} lg={8} >
                <Switch >
                  
                   <Route path="/subjects/:id/" render={() => <SubjectInfoContainer />} />
                  <Route path="/classrooms/:id/" render={() => <ClassroomInfoContainer />} />
                  <Route path="/debtors/:id/bills" render={() => <DebtBillContainer />} />
                  <Route path="/students/:id" render={()=> (<StudentInfoContainer />)} /> 
                  <Route path="/create_teacher" render={()=> (<CreateTeacherContainer />)} /> 
                  <Route path="/create_student" render={()=> (<CreateStudentContainer />)} /> 
                  <Route path="/create_announcement" render={()=> (<CreateAnnouncementContainer />)} /> 
                  <Route path="/settings" render={()=> (<SettingContainer />)} /> 
                  <Route path="/students" render={()=> (<StudentContainer />)} /> 
                  <Route path="/teachers" render={()=> (<TeacherContainer />)} /> 
                  <Route path="/classrooms" render={()=> (<ClassroomContainer />)} /> 
                  <Route path="/subjects" render={()=> (<SubjectContainer />)} /> 
                  <Route path="/bill_reports" render={()=> (<BillReportContainer />)} /> 
                  <Route path="/debtors" render={()=> (<DebtorContainer />)} /> 
                  <Route path="/items" render={()=> (<ItemContainer />)} /> 
                  <Route path="/transactions" render={()=> (<TransactionContainer />)} /> 
                  <Route path="/inventory_activities" render={()=> (<InventoryContainer />)} /> 
                  <Route path="/announcements" render={()=> (<AnnouncementContainer />)} /> 
                  <Route path="/" render={()=> (<Home />)} /> 
                </Switch>
          
            </Grid>
        </Grid>
      </Box>
      </Container>
     
    </Box>

      }
    </AdminContextProvider>

  );
}

AdminDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminDashboard;
