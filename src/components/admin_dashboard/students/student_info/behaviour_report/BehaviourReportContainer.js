import { Box, List, ListSubheader } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminContext from '../../../../../context/admin/AdminContext'
import { BehaviourReportContextProvider } from '../../../../../context/admin/BehaviourReportContext'
import { AuthContext } from '../../../../../context/AuthContext'
import { FetchContext } from '../../../../../context/FetchContext'
import BehaviourReportList from '../../../../parent_dashboard/behaviour_report/BehaviourReportList'
import Empty from '../../../../utilities/Empty'
import FailedFetch from '../../../../utilities/FailedFetch'
import Loader from '../../../../utilities/Loader'
import BehaviourReportTerm from './BehaviourReportTerm'




export default function BehaviourReportContainer(){

    
    const {dashboardInfo} = useContext(AdminContext)
    const {termDates} = dashboardInfo
    const [term_id, setTermId] = useState( termDates[0].id)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [behaviourReports, setBehaviourReports] = useState([])
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()
    const {setAuthState} = useContext(AuthContext)

   
     useEffect(() => {
        
        setLoading(true)

        authAxios.get('api/v1/admin_student_behaviour_reports/', {params: {term_id: term_id, student_id: id}})
    
        .then((res) => {
    
            const behaviour_reports = res.data

            setBehaviourReports(behaviour_reports)
            setLoading(false)
                
        }).catch(err => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setLoading(false)
            setFailed(true)
        })

     }, [term_id])


    return (
       <BehaviourReportContextProvider
        value={{
            termDates,
            term_id,
            setTermId,
        }}
       >
           
         <Box display="flex" justifyContent="flex-end" flexGrow={1} p={1}>
            <BehaviourReportTerm />
         
         </Box>
         {
                
                loading ? <Loader /> :
                failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :

            <>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}  >
                
            </Box> 
               {
                    behaviourReports.length === 0 ?
                    <Empty message="No Behaviour Report Found" height="calc(90vh - 200px)" /> :
                    <BehaviourReportList behaviourReports={behaviourReports} />

                     
               }

            </>

            }

       </BehaviourReportContextProvider>
    )
}