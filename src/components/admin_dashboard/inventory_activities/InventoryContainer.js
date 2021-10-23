
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
 
    const [termDates, setTermDates] = useState([])

    const [filterType, setFilterType] = useState('date')

    console.log("my tem ",termDates)
    const [filterInfo, setFilterInfo] = useState({
        date: new Date().toDateString(),
        term_id: termDates.length === 0 ? -1 : termDates[0].id,
        from: new Date().toDateString(),
        to: new Date().toDateString()
    })



    const {authAxios} = useContext(FetchContext)
    const {dashboardInfo, setDashboardInfo} = useContext(AdminContext)
    
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    

    useEffect(() => {

        authAxios.get('api/v1/admin_dashboards').then((res) => {

            console.log(res)
            const {classrooms, teachers, score_types, term_dates, total_students, total_classrooms, total_teachers, total_debts, debt_recovered_reports, total_recovered_reports} = res.data

            const newDashboardInfo = Object.assign({}, dashboardInfo)
            newDashboardInfo.classrooms = classrooms
            newDashboardInfo.teachers = teachers
            newDashboardInfo.scoreTypes = score_types
            newDashboardInfo.termDates = term_dates
            setTermDates(term_dates)
            const newFilterInfo = Object.assign({}, filterInfo)
            newFilterInfo.term_id = term_dates[0].id 
            setFilterInfo(newFilterInfo)
            setLoading(false)

            setDashboardInfo(newDashboardInfo)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            setFailed(true)
        })



        return () => {
          setLoading(true)
          setFailed(false)
         
        }
        
    }, [])


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
                 {
                     loading ? 
                     <Loader /> :
                     failed ?
                     <FailedFetch message="Failed To Load Inventory" height="calc(90vh - 200px)"/> : 
                  <>
                 <Box mt={2} display="flex" justifyContent="flex-end" >
                    {
                       filterType === 'date' ? <InventoryDate /> : 
                       filterType === 'term_date' ? <InventoryTerm termDates={termDates} /> :
                       filterType === 'date_range' ? <InventoryRange /> : null
                    }
                    
                 </Box>
                  <Section />
                  </>
                }
                
                
            </Box>
        </InventoryContextProvider>
       
    )
}