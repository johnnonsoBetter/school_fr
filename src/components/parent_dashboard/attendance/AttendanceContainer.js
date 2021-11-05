import { Avatar, Box, Chip } from "@mui/material"
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { StudentAttendanceContextProvider } from "../../../context/admin/StudentAttendanceContext"
import { FetchContext } from "../../../context/FetchContext"
import Empty from "../../utilities/Empty"
import FailedFetch from "../../utilities/FailedFetch"

import AttendanceList from "../../admin_dashboard/students/student_info/attendance/AttendanceList"
import AttendanceTerm from "../../admin_dashboard/students/student_info/attendance/AttendanceTerm"
import MobileAttendanceList from "../../admin_dashboard/students/student_info/attendance/MobileAttendanceLIst"
import Loader from "../../utilities/Loader"
import { blue } from "@mui/material/colors"
import { ParentContext } from "../../../context/parent/ParentContext"



export default function AttendanceContainer ( ){

    const [termDates, setTermDates] = useState([])
    const [term_id, setTermId] = useState(-1)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [attendances, setAttendances] = useState([{created_at: "2021-9-05 15:04:49"}])
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()
    const {student_id, student} = useContext(ParentContext)
    const child = student()

    
  

   

    useEffect(() => {
        

        if (term_id == -1) {
            setLoading(true)
            authAxios.get('api/v1/guidance_student_attendances/', {params: {student_id: student_id}})
       
            .then((res) => {
     
            const {term_dates, attendances} = res.data
          
            
            setTermId(term_dates[0].id)
            setTermDates(term_dates)
            setAttendances(attendances)
        
            setLoading(false)
            

            }).catch(err => {
               
                setLoading(false)
                setFailed(true)
            })
            

        }else {
            setLoading(true)
            authAxios.get('api/v1/guidance_student_attendances/', {params: {term_id: term_id, student_id: student_id}})
        
        .then((res) => {
 
            const {term_dates, attendances} = res.data
            console.log(attendances)
            console.log(term_dates)

            setAttendances(attendances)
            setLoading(false)
             
 
        }).catch(err => {
         
            setLoading(false)
            setFailed(true)
        })



          
        }
        
 
 
     }, [term_id, student_id])


    return (
       <StudentAttendanceContextProvider
        value={{
            termDates,
            term_id,
            setTermId,
        }}
       >
         
         <Box display="flex" justifyContent="space-between" alignItems="center" p={1}  >
                <Chip sx={{bgcolor: blue[300], color: "white", fontWeight: "bold", textTransform: "capitalize"}} avatar={<Avatar   src="/images/nonso.png" />} label={`${child.first_name} ${child.last_name}`}  />
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