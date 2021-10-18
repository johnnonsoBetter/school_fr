import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { green } from '@mui/material/colors';




export default function GroupedStudentFilterInput(props) {

 const {setStudents, allStudents} = props

  const options = allStudents.map((option) => {
    const firstLetter = option.full_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
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
            setStudents(allStudents)
        }else{
            const newStudents =  allStudents.filter(student => student.full_name === value.full_name)
            setStudents(newStudents)

        }

      }} 
      renderInput={(params) => <TextField  fullWidth sx={{width: {sm: "270px"}, border: "none", color: green[300]}}  size="small" {...params} label="Search Students" />}
    />
  );
}
