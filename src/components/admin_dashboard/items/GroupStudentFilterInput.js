import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { green } from '@mui/material/colors';



export default function GroupedStudentFilterInput(props) {

 const {setItems, allItems} = props

  const options = allItems.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
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
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => {

        if (value === null) {
            setItems(allItems)
        }else{
            const newItems =  allItems.filter(student => student.name === value.name)
            setItems(newItems)

        }

      }} 
      renderInput={(params) => <TextField  fullWidth sx={{width: {sm: "270px"}, border: "none", color: green[300]}}  size="small" {...params} label="Search Items" />}
    />
  );
}
 