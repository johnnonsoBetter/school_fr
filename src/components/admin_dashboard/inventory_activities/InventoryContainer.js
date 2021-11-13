
import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../../../context/admin/AdminContext'
import { InventoryContextProvider } from '../../../context/admin/InventoryContext'
import { FetchContext } from '../../../context/FetchContext'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import FilterHeader from './FilterHeader'
import Section from './Section'
import InventoryDate from './InventoryDate'
import InventoryRange from './InventoryRange'
import InventoryTerm from './InventoryTerm'

export default function InventoryContainer(){
 
    
    


    const {dashboardInfo} = useContext(AdminContext)
    const {termDates} = dashboardInfo
    const [filterType, setFilterType] = useState('date')
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

                    <Typography variant="h4"> Inventory</Typography>
                    <FilterHeader />
                 </Box>
                
                 <Box mt={2} display="flex" justifyContent="flex-end" >
                    {
                       filterType === 'date' ? <InventoryDate /> : 
                       filterType === 'term_date' ? <InventoryTerm termDates={termDates} /> :
                       filterType === 'date_range' ? <InventoryRange /> : null
                    }
                    
                 </Box>
                  <Section />
   
            </Box>
        </InventoryContextProvider>
       
    )
}