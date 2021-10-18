import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../../../context/AuthContext';
import SaleReportContainer from './sales/SaleReportContainer';
import ExpenseReportContainer from './expenses/ExpenseReportContainer';
import DebtRecoveredReportContainer from './debts_recovered/DebtRecoveredReportContainer';

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
          <Tab label="Sales"  to= {isAuthenticated() ? `${path}` : "/login"}
              activeClassName={ 
                window.location.pathname === `${path}` ? classes.navlink : ""
            }   component={NavLink}
          />
          <Tab label="Expenses" activeClassName={classes.navlink} component={NavLink} to={isAuthenticated() ? `${path}/expenses` : "/login" }    />
          <Tab label="Debt Recovered" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? `${path}/debt_recovered` : "/login"}   />
        </Tabs>
      </Box>
     
        <Switch >
          <Route exact path={path}  >
              <SaleReportContainer />
          </Route>
          <Route exact path={`${path}/expenses`}   >
              <ExpenseReportContainer />
          </Route>
          <Route exact path={`${path}/debt_recovered`} >
             <DebtRecoveredReportContainer />
          </Route>
        </Switch>
        
    </>
  );
}
