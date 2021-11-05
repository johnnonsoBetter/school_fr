

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, NavLink, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../../../../context/AuthContext';
import ScoreReportContainer from './score_reports/ScoreReportContainer';
import BehaviourReportContainer from './behaviour_report/BehaviourReportContainer';
import BillContainer from './bills/BillContainer';
import Profile from './profile/Profile';
import AttendanceContainer from './attendance/AttendanceContainer';



const useStyles = makeStyles((theme) => ({
  navlink: {
      
      borderBottom: "1px solid gray",
      borderBottomColor: blue[500]
  }
}))

export default function StudentInfoContainer() {

  const [value, setValue] = React.useState(0);
  const classes = useStyles()
  const {path, url} = useRouteMatch()
  const {isAuthenticated} = React.useContext(AuthContext)
  const {id} = useParams()
  const {pathname} = useLocation()

  console.log(path)
  console.log(window.location.pathname)

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs   aria-label="basic tabs example" variant="scrollable" >
          <Tab label="Profile" 
              activeClassName={ 
                window.location.pathname ===  `/students/${id}/` ? classes.navlink : ""
            }   component={NavLink}  to={`/students/${id}/`}
          />
          <Tab label="Bills" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "bills" : "/login"}   />
          <Tab label="Score Reports" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "score_reports" : "/login"}   />
          <Tab label="Behaviour Reports" activeClassName={classes.navlink} component={NavLink} to={isAuthenticated() ? "behaviour_reports" : "/login" }    />
          <Tab label="Attendance" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "attendances" : "/login"}   />
          <Tab label="Report Cards" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "report_cards" : "/login"}   />
        </Tabs>
      </Box>
     
        <Switch >
          <Route exact path={`${path}/`}  >
             <Profile />
          </Route>
          <Route exact path={`${path}/score_reports`}  >
            <ScoreReportContainer />
          </Route>
          <Route exact path={`${path}/behaviour_reports`} >
            <BehaviourReportContainer />
          </Route>  
          <Route exact path={`${path}/bills`} >
            <BillContainer />
          </Route>
          <Route exact path={`${path}/attendances`} >
            <AttendanceContainer />
          </Route>
         
        </Switch>
        
    </>
  );
}
