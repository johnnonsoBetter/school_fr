import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import AdminContext from '../../../context/admin/AdminContext'
import { TransactionContextProvider } from '../../../context/admin/TransactionContext'
import FilterHeader from './FilterHeader'
import Section from './Section'
import TransactionDate from './TransactionDate'
import TransactionRange from './TransactionRange'
import TransactionTerm from './TransactionTerm'

export default function TransactionContainer(){
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
        <TransactionContextProvider
            value={{
                filterType,
                setFilterType,
                filterInfo,
                setFilterInfo,
            }}
        >
             <Box flexGrow={1} >
                 <Box width="100%" display="flex" justifyContent="space-between" >

                    <Typography variant="h4"> Transactions</Typography>
                    <FilterHeader />
                 </Box>
                 <Box mt={2} display="flex" justifyContent="flex-end" >
                    {
                       filterType === 'date' ? <TransactionDate /> : 
                       filterType === 'term_date' ? <TransactionTerm /> :
                       filterType === 'date_range' ? <TransactionRange /> : null
                    }
                    
                 </Box>
                 <Section />
                
            </Box>
        </TransactionContextProvider>
       
    )
}