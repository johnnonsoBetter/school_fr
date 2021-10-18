

 import * as React from 'react';
 import PropTypes from 'prop-types';
 import Tabs from '@mui/material/Tabs';
 import Tab from '@mui/material/Tab';
 import Typography from '@mui/material/Typography';
 import Box from '@mui/material/Box';
import StudentList from '../../students/StudentList';
import { Badge } from '@mui/material';
import SubjectList from '../../subjects/SubjectList';
import TeacherList from '../../teachers/TeacherList';
 
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
 
 export default function ClassroomInfoTabs({classroomInfo, setStudents, setTeachers}) {
   const [value, setValue] = React.useState(0);
 
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
 
   return (
     <Box sx={{ width: '100%' }}>
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
         <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="basic tabs example">
           <Tab label="Students"  {...a11yProps(0)} />
           <Tab label="Teachers" {...a11yProps(1)} />
           <Tab label="Subjects" {...a11yProps(2)} />
         </Tabs>
       </Box>
       <TabPanel value={value} index={0}>
         <StudentList students={classroomInfo.students} allStudents={classroomInfo.allStudents} setStudents={setStudents} />
       </TabPanel>
       <TabPanel value={value} index={1}>
         <TeacherList teachers={classroomInfo.teachers} allTeachers={classroomInfo.allTeachers} setTeachers={setTeachers}/>
       </TabPanel>
       <TabPanel value={value} index={2}>
         <SubjectList subjects={classroomInfo.subjects} />
       </TabPanel>
     </Box>
   );
 }
 