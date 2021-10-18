
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TransactionContext from '../../../context/admin/TransactionContext';

export default function FilterHeader() {
  const {filterType, setFilterType} = React.useContext(TransactionContext)

  const handleChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <Box>
      <FormControl >
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterType}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='term_date'>Term Date</MenuItem>
          <MenuItem value='date_range'>Date Range</MenuItem>
         
        </Select>
      </FormControl>
    </Box>
  );
}
