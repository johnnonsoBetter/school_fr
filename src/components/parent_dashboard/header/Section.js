import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ScoreReport from '../score_report/ScoreReportContainer';
import BillContainer from '../bill/BillContainer';
import BehaviourReportContainer from '../behaviour_report/BehaviourReportContainer';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  navlink: {
      
      borderBottom: "1px solid gray",
      borderBottomColor: blue[500]
  }
}))

export default function Section() {

  const [value, setValue] = React.useState(0);
  const classes = useStyles()
  const {path, url} = useRouteMatch()
  const {isAuthenticated} = React.useContext(AuthContext)

  console.log(path)
  console.log(isAuthenticated())

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs   aria-label="basic tabs example" variant="scrollable" >
          <Tab label="Score Report"  to= {isAuthenticated() ? "/dashboard" : "/login"}
              activeClassName={ 
                window.location.pathname === '/dashboard' ? classes.navlink : ""
            }   component={NavLink}
          />
          <Tab label="Behaviour Report" activeClassName={classes.navlink} component={NavLink} to={isAuthenticated() ? "/dashboard/behaviour_reports/" : "/login" }    />
          <Tab label="Bills" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "/dashboard/bills" : "/login"}   />
        </Tabs>
      </Box>
     
        <Switch >
          <Route exact path={path}  >
              <ScoreReport />
          </Route>
          <Route exact path="/dashboard/behaviour_reports/" >
              <BehaviourReportContainer />
          </Route>
          <Route exact path="/dashboard/bills" >
            <BillContainer />
          </Route>
        </Switch>
        
    </>
  );
}
