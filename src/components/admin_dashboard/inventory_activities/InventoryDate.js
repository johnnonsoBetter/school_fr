import React, { useContext, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import InventoryContext from '../../../context/admin/InventoryContext';



export default function InventoryDate() {

    
    const {filterInfo, setFilterInfo} = useContext(InventoryContext)
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