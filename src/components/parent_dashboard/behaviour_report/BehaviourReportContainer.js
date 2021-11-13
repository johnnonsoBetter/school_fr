import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TheDate from './TheDate'
import BehaviourReportList from './BehaviourReportList'
import Badge from '@mui/material';
import {Chip, Avatar} from '@mui/material';
import { ParentContext } from '../../../context/parent/ParentContext';
import { blue } from '@mui/material/colors';
import FailedFetch from '../../utilities/FailedFetch';
import Loader from '../../utilities/Loader';
import Empty from '../../utilities/Empty';
import { useLocation } from 'react-router-dom';
import { FetchContext } from '../../../context/FetchContext';
import queryString from 'query-string'
import { AuthContext } from '../../../context/AuthContext';





export default function BehaviourReportContainer(){
    const {student_id, student} = useContext(ParentContext)
    const child = student()
    const [behaviourReports, setBehaviourReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const location = useLocation()
    const {authAxios} = useContext(FetchContext)
    const value = queryString.parse(location.search)
    const {setAuthState} = useContext(AuthContext)


    useEffect(() => {
       setLoading(true)
        authAxios.get('api/v1/guidance_behaviour_reports', {params: {student_id: student_id, date: Object.keys(value).length === 0 ? new Date().toDateString() : value.date}}).then((res) => {

            
            const {data} = res
            setBehaviourReports(data)
            setLoading(false)

        }).catch(err => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setLoading(false)
            setFailed(true)
        })
    }, [location.search, student_id])

    return (
        <Box >
            
          

            {
                
                loading ? <Loader /> :
                failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :

            <>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}  >
                <Chip sx={{bgcolor: blue[300], color: "white", fontWeight: "bold", textTransform: "capitalize"}} avatar={<Avatar   src="/images/nonso.png" />} label={`${child.first_name} ${child.last_name}`}  />
                <TheDate />

            </Box> 
               {
                    behaviourReports.length === 0 ?
                    <Empty message="No Behaviour Report Found" height="calc(90vh - 200px)" /> :
                    <BehaviourReportList behaviourReports={behaviourReports} /> 
               }

            </>

            }
            
       

        </Box>
    )

}
