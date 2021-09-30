import React, { useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'



export default function TheDate() {

    const [value, setValue] = useState(new Date().toDateString())
    const history = useHistory()
    const location = useLocation()

    const search = queryString.parse(location.search)

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={Object.keys(search).length === 0 ? value : search.date}
                onChange={(newValue) => {
                    setValue(newValue);
                    const date = newValue.toDateString().replaceAll(' ', '+')
                    history.push(`?date=${date}`)
                  
                }}
                renderInput={(params) => <TextField size="small" sx={{width: "160px"}}  {...params} />}
            />

        </LocalizationProvider>
    )
}