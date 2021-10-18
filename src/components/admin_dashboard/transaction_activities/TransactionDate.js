import React, { useContext, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import TransactionContext from '../../../context/admin/TransactionContext';



export default function TransactionDate() {

    
    const {filterInfo, setFilterInfo} = useContext(TransactionContext)
    const [dateValue, setDateValue] = useState(new Date().toDateString())

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={dateValue}
                onChange={(value) => {
                    
                    const newFilterInfo = Object.assign({}, filterInfo)
                    newFilterInfo.date = value.toDateString() 

                    setFilterInfo(newFilterInfo)
                    setDateValue(value.toDateString())

                }}
                renderInput={(params) => <TextField size="small" sx={{width: "160px"}}  {...params} />}
            />

        </LocalizationProvider>
    )
}