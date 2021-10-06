import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import UnscoredDraftReportContext from '../../../../context/teacher/UnscoredDraftReportContext';


export default function GroupedStudentFilterInput() {

  const {unscoredStudentDrafts} = React.useContext(UnscoredDraftReportContext)

  console.log(unscoredStudentDrafts, "my unscorede")

  const options = unscoredStudentDrafts.map((option) => {
    const firstLetter = option.full_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      fullWidth
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.full_name}
      onChange={(event, value) => console.log(value)} 
      renderInput={(params) => <TextField size="small" {...params} label="Find Students" />}
    />
  );
}
