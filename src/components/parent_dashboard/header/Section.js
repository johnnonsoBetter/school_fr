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
import { FetchContext } from '../../../context/FetchContext';
import AttendanceContainer from '../attendance/AttendanceContainer';

const useStyles = makeStyles((theme) => ({
  navlink: {
      
      borderBottom: "1px solid gray",
      borderBottomColor: blue[500]
  }
}))

export default function Section() {



  
  const classes = useStyles()
  const {path, url} = useRouteMatch()
  const {isAuthenticated} = React.useContext(AuthContext)
  const {authAxios} = React.useContext(FetchContext)
  const [displayNotificationNotice, setDisplayNotificationNotice] = React.useState(false)
  const {setAuthState} = React.useContext(AuthContext)



 function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



const vapidPublicKey = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)




  React.useEffect(() => {

    if ('serviceWorker' in navigator && 'PushManager' in window) {

      

        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
          serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey
          }).then((sub) => {
            const s =  JSON.stringify(sub)
            const subParams = JSON.parse(s)
      
            authAxios.post('api/v1/notifications', 
            {subscription: {endpoint: subParams.endpoint, expirationTime: subParams.expirationTime, keys: subParams.keys }}).then((res) => {
              console.log(res)
            }).catch(err => {
              const {status} = err.response 
              if (status === 401){
                  setAuthState({})
              }
              console.log(err)
            })
    
          
          })
        });
       
     
      
      
    }


    

  }, [])



  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs   aria-label="basic tabs example" variant="scrollable" >
          <Tab label="Score Reports"  to= {isAuthenticated() ? "/dashboard" : "/login"}
              activeClassName={ 
                window.location.pathname === '/dashboard' ? classes.navlink : ""
            }   component={NavLink}
          />
          <Tab label="Behaviour Reports" activeClassName={classes.navlink} component={NavLink} to={isAuthenticated() ? "/dashboard/behaviour_reports/" : "/login" }    />
          <Tab label="Bills" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "/dashboard/bills" : "/login"}   />
          <Tab label="Attendance" activeClassName={classes.navlink}  component={NavLink} to= {isAuthenticated() ? "/dashboard/attendances" : "/login"}   />
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
          <Route exact path="/dashboard/attendances" >
            <AttendanceContainer />
          </Route>
        </Switch>
        
    </>
  );
}
