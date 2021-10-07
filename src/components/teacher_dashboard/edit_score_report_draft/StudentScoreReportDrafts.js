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
import { FetchContext } from '../../../context/FetchContext';
import { useHistory, useParams } from 'react-router-dom';

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
  const [loading, setLoading] = React.useState(false)
  const {id} = useParams()
  const history = useHistory()



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  const {scoreReportDraft} = React.useContext(EditStudentDraftContext)
  const {authAxios} = React.useContext(FetchContext)


  const publish = () => {
   
    setLoading(true)
    
    authAxios.post('api/v1/publish_drafts', {score_report_draft_id: id} ).then((res) => {
     
      history.push('/')

    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable"  aria-label="basic tabs example">
          <Tab label="Unmarked" {...a11yProps(0)} />
          <Tab label="Marked" {...a11yProps(1)} />
          
          <IconButton> </IconButton>
          <Button onClick={publish} disabled={scoreReportDraft.published} endIcon={ scoreReportDraft.published ? <CheckCircleOutlineRounded sx={{color: green[300]}} /> : <CloudUploadRounded />  }> 

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
