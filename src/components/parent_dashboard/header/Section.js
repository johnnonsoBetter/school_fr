import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ScoreReport from '../score_report/ScoreReportContainer';
import BillContainer from '../bill/BillContainer';
import BehaviourReportContainer from '../behaviour_report/BehaviourReportContainer';
import { Link, Route, Switch } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Section() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value}  onChange={handleChange} aria-label="basic tabs example" variant="scrollable" >
          <Tab label="Score Report" component={Link} to="/dashboard/" {...a11yProps(0)} />
          <Tab label="Behaviour Report" component={Link} to="/dashboard/behaviour_reports/" {...a11yProps(1)} />
          <Tab label="Bills" component={Link} to="/dashboard/bills" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={0}>
        <ScoreReport />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BehaviourReportContainer />
      </TabPanel>
  
      <TabPanel value={value} index={2}>
        <BillContainer />
      </TabPanel> */}
        <Switch >
          <Route exact path="/dashboard/" >
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