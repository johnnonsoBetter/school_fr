import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import TheDate from './TheDate'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import BehaviourReport from './BehaviourReport'
import { AuthContext } from '../../../context/AuthContext'

export default function BehaviourReportContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [behaviourReports, setBehaviourReports] = useState([])
    const {authAxios} = useContext(FetchContext)
    const location = useLocation()
    const value = queryString.parse(location.search)
    const {setAuthState} = useContext(AuthContext)



    useEffect(() => {
        setLoading(true)
        authAxios.get('api/v1/teacher_behaviour_reports', {params: {date: Object.keys(value).length === 0 ? new Date().toDateString() : value.date}}).then((res) => {

            console.log(res)
            setBehaviourReports(res.data)
            setLoading(false)
        }).catch((err) => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setLoading(false)
            setFailed(true)

        })

        return () => {
            setBehaviourReports([])
            setLoading(true)
            setFailed(false)
        }

        

    }, [location.search])


    return (
        <>
            <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
                <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">My Behaviour Reports</Typography>
                <TheDate />
                
            </Box>
            <Box >

            {
                loading ? 
                <Loader /> :
                failed ?
                <FailedFetch message="Failed To Load Behaviour Reports" height="calc(90vh - 200px)"/> : 
                <>  
                {
                behaviourReports.length === 0 ? 
                <Empty message="No Behaviour Report Found" height="calc(90vh - 200px)"/> :
                <Grid container >
                    

                    {
                        behaviourReports.map((behaviourReport) => {

                            return (
                                <Grid item xs={12} sm={6} >
                                    <BehaviourReport behaviourReport={behaviourReport} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                }

                </> 
            }

             </Box>
        </>
    )

}
