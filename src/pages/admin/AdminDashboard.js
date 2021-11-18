import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Backdrop, Button, Chip, CircularProgress, Container, Grid, Hidden, LinearProgress } from '@mui/material';


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
import ReportCardContainer from '../../components/admin_dashboard/report_cards/ReportCardContainer';


const drawerWidth = 240;

function AdminDashboard(props) {
 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerChildType, setDrawerChildType] = useState('')
  const [loading, setLoading] = useState(true)
  const {authAxios} = useContext(FetchContext)
  const [failed, setFailed] = useState(false)
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
    classrooms: [],
    totalStudents: 0,
    totalTeachers: 0,
    totalClassrooms: 0,
    totalDebtRecovered: 0,
    totalDebts: 0,
    debtRecoveredReports: [],
    announcementImages: []

  })
    

    useEffect(() => {

        authAxios.get('api/v1/admin_dashboards').then((res) => {

            console.log(res)
            const {classrooms, teachers, score_types, term_dates, total_students, announcement_images,  total_classrooms, total_teachers, total_debts, debt_recovered_reports, total_recovered_reports} = res.data
 
            const newDashboardInfo = Object.assign({}, dashboardInfo)
            newDashboardInfo.classrooms = classrooms
            newDashboardInfo.teachers = teachers
            newDashboardInfo.scoreTypes = score_types
            newDashboardInfo.termDates = term_dates
            newDashboardInfo.totalClassrooms = total_classrooms
            newDashboardInfo.totalTeachers = total_teachers
            newDashboardInfo.totalDebtRecovered = total_recovered_reports
            newDashboardInfo.totalDebts = total_debts
            newDashboardInfo.totalStudents = total_students
            newDashboardInfo.debtRecoveredReports = debt_recovered_reports
            newDashboardInfo.announcementImages = announcement_images
            setDashboardInfo(newDashboardInfo)
            setLoading(false)
        }).catch((err) => {
            const {status} = err.response 
            

            setLoading(false)
            setFailed(true)
            
        })



        return () => {
          setLoading(false)
          setFailed(false)
          setDashboardInfo({})
        }
        
    }, [])
  
 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {

    
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
                <Switch >P
                  
                   <Route path="/subjects/:id/" render={() => <SubjectInfoContainer />} />
                   <Route path="/report_cards/" render={() => <ReportCardContainer />} />
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
