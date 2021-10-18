import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { AuthContext } from '../../../context/AuthContext';
import RestockReportContainer from './restocks/RestockReportContainer';
import StockRepairReportContainer from './stock_repairs/StockRepairReportContainer';


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
          <Tab label="Restock"  to= {isAuthenticated() ? `${path}` : "/login"}
              activeClassName={ 
                window.location.pathname === `${path}` ? classes.navlink : ""
            }   component={NavLink}
          />
          <Tab label="Stock Repair" activeClassName={classes.navlink} component={NavLink} to={isAuthenticated() ? `${path}/stock_repairs` : "/login" }    />
          
        </Tabs>
      </Box>
     
        <Switch >
          <Route exact path={path}  >
              <RestockReportContainer />
          </Route>
        
          <Route exact path={`${path}/stock_repairs`} >
             <StockRepairReportContainer />
          </Route>
         
        </Switch>
        
    </>
  );
}
