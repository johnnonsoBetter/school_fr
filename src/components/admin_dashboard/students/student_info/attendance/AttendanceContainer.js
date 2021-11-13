import { Box } from "@mui/material"
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import AdminContext from "../../../../../context/admin/AdminContext"
import { StudentAttendanceContextProvider } from "../../../../../context/admin/StudentAttendanceContext"
import { AuthContext } from "../../../../../context/AuthContext"
import { FetchContext } from "../../../../../context/FetchContext"
import Empty from "../../../../utilities/Empty"
import FailedFetch from "../../../../utilities/FailedFetch"
import Loader from "../../../../utilities/Loader"
import AttendanceList from "./AttendanceList"
import AttendanceTerm from "./AttendanceTerm"
import MobileAttendanceList from "./MobileAttendanceLIst"



export default function AttendanceContainer ( ){


    const {dashboardInfo} = useContext(AdminContext)
    const {termDates} = dashboardInfo
    const [term_id, setTermId] = useState( termDates[0].id)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [attendances, setAttendances] = useState([{created_at: "2021-9-05 15:04:49"}])
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()
    const {setAuthState} = useContext(AuthContext)


     
    useEffect(() => {
        
        setLoading(true)

        authAxios.get('api/v1/admin_student_attendances/', {params: {term_id: term_id, student_id: id}})
    
        .then((res) => {
    
            const attendances = res.data

            setAttendances(attendances)
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
       <StudentAttendanceContextProvider
        value={{
            termDates,
            term_id,
            setTermId,
        }}
       >
           
         <Box display="flex" justifyContent="flex-end" flexGrow={1} p={1}>
            <AttendanceTerm />
         
         </Box>
         {
                
                loading ? <Loader /> :
                failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :

            <>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}  >
                
            </Box> 
               {
                    attendances.length === 0 ?
                    <Empty message="No Attendance Found" height="calc(90vh - 200px)" /> :
                    <Box >
                        <Box  sx={{display: {xs: 'none', sm: 'block'}}} >
                            <AttendanceList attendances={attendances} />
                        </Box>

                        <Box  sx={{display: {xs: 'block', sm: 'none'}}} >
                            <MobileAttendanceList attendances={attendances} />
                        </Box>
                        

                    </Box>
                    
                     
               }

            </>

            }

       </StudentAttendanceContextProvider>
    )

}