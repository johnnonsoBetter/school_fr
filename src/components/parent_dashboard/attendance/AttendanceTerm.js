
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StudentAttendanceContext from '../../../context/admin/StudentAttendanceContext';




export default function AttendanceTerm(props) {
  const {termDates, term_id, setTermId} = React.useContext(StudentAttendanceContext)


  const handleChange = (event) => {
    // const newFilterInfo = Object.assign({}, filterInfo)
    // newFilterInfo.term_id = event.target.value
    // setFilterInfo(newFilterInfo)
     setTermId(event.target.value)
  };

  return (
    <Box sx={{mr: 1}}>
      <FormControl >
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={term_id}
          size="small"
          onChange={handleChange}
        >
         
          {
              termDates.map((term) => (
              <MenuItem key={term.id} value={term.id} > {term.name}</MenuItem>
              ))
          }
         
        </Select>
      </FormControl>
    </Box>
  );
}
