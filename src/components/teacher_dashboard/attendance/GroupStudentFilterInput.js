import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { green } from '@mui/material/colors';



export default function GroupedStudentFilterInput(props) {

 const {setAttendances, allAttendances} = props

  const options = allAttendances.map((option) => {
    const {student} = option
    const firstLetter = student.full_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...student,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.full_name}
      onChange={(event, value) => {

        if (value === null) {
            setAttendances(allAttendances)
        }else{
            const newAttendances =  allAttendances.filter(att => att.student.full_name === value.full_name)

            console.log(newAttendances)
            setAttendances(newAttendances)

        }

      }} 
      renderInput={(params) => <TextField  fullWidth sx={{width: {sm: "270px"}, border: "none", color: green[300]}}  size="small" {...params} label="Search Students" />}
    />
  );
}
