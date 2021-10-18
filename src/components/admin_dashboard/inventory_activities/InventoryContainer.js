


import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import AdminContext from '../../../context/admin/AdminContext'
import { InventoryContextProvider } from '../../../context/admin/InventoryContext'
import FilterHeader from './FilterHeader'
import Section from './Section'
import InventoryDate from './InventoryDate'
import InventoryRange from './InventoryRange'
import InventoryTerm from './InventoryTerm'

export default function InventoryContainer(){
    const {termDates} = useContext(AdminContext).dashboardInfo
  

    const [filterType, setFilterType] = useState('date')

    console.log("my tem ",termDates)
    const [filterInfo, setFilterInfo] = useState({
        date: new Date().toDateString(),
        term_id: termDates[0].id,
        from: new Date().toDateString(),
        to: new Date().toDateString()
    })


    return (
        <InventoryContextProvider
            value={{
                filterType,
                setFilterType,
                filterInfo,
                setFilterInfo,
            }}
        >
             <Box flexGrow={1} >
                 <Box width="100%" display="flex" justifyContent="space-between" >

                    <Typography variant="h4"> Inventory Activities</Typography>
                    <FilterHeader />
                 </Box>
                 <Box mt={2} display="flex" justifyContent="flex-end" >
                    {
                       filterType === 'date' ? <InventoryDate /> : 
                       filterType === 'term_date' ? <InventoryTerm /> :
                       filterType === 'date_range' ? <InventoryRange /> : null
                    }
                    
                 </Box>
                 <Section />
                
            </Box>
        </InventoryContextProvider>
       
    )
}