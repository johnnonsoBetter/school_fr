import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { TextField } from '@mui/material';



export default function TheDate() {


    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                value={new Date()}
                renderInput={(params) => <TextField {...params} />}
            />

        </LocalizationProvider>
    )
}