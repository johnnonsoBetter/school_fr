import { Box, Typography } from '@mui/material'
import React, { useContext,  useState } from 'react'
import AdminContext from '../../../context/admin/AdminContext'
import { TransactionContextProvider } from '../../../context/admin/TransactionContext'
import { FetchContext } from '../../../context/FetchContext'
import FilterHeader from './FilterHeader'
import Section from './Section'
import TransactionDate from './TransactionDate'
import TransactionRange from './TransactionRange'
import TransactionTerm from './TransactionTerm'

export default function TransactionContainer(){


    const [filterType, setFilterType] = useState('date')
    const {dashboardInfo} = useContext(AdminContext)
    const {termDates} = dashboardInfo
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
                       filterType === 'term_date' ? <TransactionTerm termDates={termDates} /> :
                       filterType === 'date_range' ? <TransactionRange /> : null
                    }
                    
                 </Box>
                  <Section />
                
            </Box>
        </TransactionContextProvider>
       
    )
}