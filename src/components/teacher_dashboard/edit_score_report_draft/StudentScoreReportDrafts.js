import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import { CheckCircleOutlineRounded, CloudUploadRounded } from '@mui/icons-material';
import UnscoredStudentDrafts from './unscored/UnscoreStudentDrafts';
import ScoredStudentDrafts from './scored/ScoredStudentDrafts';
import EditStudentDraftContext from '../../../context/teacher/EditStudentDraftContext';
import { green } from '@mui/material/colors';

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

export default function StudentScoreReportDrafts() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const {scoreReportDraft} = React.useContext(EditStudentDraftContext)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable"  aria-label="basic tabs example">
          <Tab label="Unmarked" {...a11yProps(0)} />
          <Tab label="Marked" {...a11yProps(1)} />
          
          <IconButton> </IconButton>
          <Button disabled={scoreReportDraft.published} endIcon={ scoreReportDraft.published ? <CheckCircleOutlineRounded sx={{color: green[300]}} /> : <CloudUploadRounded />  }> 
          
              {
                scoreReportDraft.published ? "Published" : "Publish"
              }
            </Button>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UnscoredStudentDrafts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScoredStudentDrafts />
      </TabPanel>
      
    </Box>
  );
}
