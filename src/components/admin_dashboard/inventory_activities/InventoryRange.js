import React, { useContext, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { orange } from '@mui/material/colors';
import { ForwardRounded } from '@mui/icons-material';
import InventoryContext from '../../../context/admin/InventoryContext';



export default function InventoryRange() {

    const [fromValue, setFromValue] = useState(new Date().toDateString())
    const [toValue, setToValue] = useState(new Date().toDateString())
    const {filterInfo, setFilterInfo} = useContext(InventoryContext)

    

    const applyRange = () => {

        const newFilterInfo = Object.assign({}, filterInfo)
        newFilterInfo.from = fromValue
        newFilterInfo.to = toValue
        setFilterInfo(newFilterInfo)

        
    }



    return (

        <Box display="flex" alignItems="center" >
            <Box display="flex" alignItems="center" >
                <Typography sx={{mr: 1, display: {xs: "none", sm: "block"}}}> from: </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={fromValue}
                    onChange={(value) => {
                        
                       setFromValue(value)
                    }}
                    renderInput={(params) => <TextField size="small" sx={{mr: {xs: 1}, ml: {xs: 1}, width: {xs: "100%", sm: "160px"}}}  {...params} />}
                />

                </LocalizationProvider>


            </Box>
            

            <Box display="flex" alignItems="center" >
            <Typography sx={{mr: 1, display: {xs: "none", sm: "block"}}}> to: </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={toValue}
                    onChange={(value) => {
                        setToValue(value)
                    }}
                    renderInput={(params) => <TextField size="small" sx={{mr: {xs: 1}, ml: {xs: 1}, width: {xs: "100%", sm: "160px"}}}  {...params} />}
                />

                </LocalizationProvider>


            </Box>
            
            <IconButton onClick={() => applyRange()} sx={{display: {xs: "block", sm: "none"}}}>
                <ForwardRounded />
            </IconButton>
            <Button onClick={() => applyRange()}  sx={{bgcolor: orange[300], color: "black", ml: 1, display: {xs: "none", sm: "block"}}} > Check </Button>
        </Box>
    )
}