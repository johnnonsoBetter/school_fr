
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TransactionContext from '../../../context/admin/TransactionContext';
import AdminContext from '../../../context/admin/AdminContext';
import { useContext } from 'react';

export default function TransactionTerm(props) {
  const {termDates} = props
  const {filterInfo, setFilterInfo} = useContext(TransactionContext)
  const [value, setValue] = React.useState(termDates[0].id)

  const handleChange = (event) => {
    const newFilterInfo = Object.assign({}, filterInfo)
    newFilterInfo.term_id = event.target.value
    setFilterInfo(newFilterInfo)
    setValue(event.target.value)
  };

  return (
    <Box>
      <FormControl >
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
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
