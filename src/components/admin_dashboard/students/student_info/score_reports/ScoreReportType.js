
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import ScoreReportContext from '../../../../../context/admin/ScoreReportContext';

export default function ScoreReportType() {
  const {scoreTypes, scoreType, setScoreType} = React.useContext(ScoreReportContext)

  const handleChange = (event) => {
    // const newFilterInfo = Object.assign({}, filterInfo)
    // newFilterInfo.score_id = event.target.value
    // setFilterInfo(newFilterInfo)
     setScoreType(event.target.value)
  };

  return (
    <Box >
      <FormControl >
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={scoreType}
          size="small"
          onChange={handleChange}
        >
         
          {
              scoreTypes.map((score) => (
              <MenuItem key={score} value={score} > {score}</MenuItem>
              ))
          }
         
        </Select>
      </FormControl>
    </Box>
  );
}
