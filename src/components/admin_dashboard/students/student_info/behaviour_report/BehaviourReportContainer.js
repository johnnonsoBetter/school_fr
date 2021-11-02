import { Box, List, ListSubheader } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminContext from '../../../../../context/admin/AdminContext'
import { BehaviourReportContextProvider } from '../../../../../context/admin/BehaviourReportContext'
import { FetchContext } from '../../../../../context/FetchContext'
import BehaviourReportList from '../../../../parent_dashboard/behaviour_report/BehaviourReportList'
import Empty from '../../../../utilities/Empty'
import FailedFetch from '../../../../utilities/FailedFetch'
import Loader from '../../../../utilities/Loader'
import BehaviourReportTerm from './BehaviourReportTerm'




export default function BehaviourReportContainer(){

    
    const [termDates, setTermDates] = useState([])
    const [term_id, setTermId] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [behaviourReports, setBehaviourReports] = useState([])
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()

   

    useEffect(() => {
        

        if (term_id == -1) {
            setLoading(true)
            authAxios.get('api/v1/admin_student_behaviour_reports/', {params: {student_id: id}})
       
            .then((res) => {
     
            const {term_dates, behaviour_reports} = res.data
            
            
            setTermId(term_dates[0].id)
            setTermDates(term_dates)
            setBehaviourReports(behaviour_reports)
        
            setLoading(false)
            

            }).catch(err => {
               
                setLoading(false)
                setFailed(true)
            })
            

        }else {
            setLoading(true)
            authAxios.get('api/v1/admin_student_behaviour_reports/', {params: {term_id: term_id, student_id: id}})
        
        .then((res) => {
 
            const {behaviour_reports} = res.data

            setBehaviourReports(behaviour_reports)
            setLoading(false)
             
 
        }).catch(err => {
         
            setLoading(false)
            setFailed(true)
        })



          
        }
        
 
 
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