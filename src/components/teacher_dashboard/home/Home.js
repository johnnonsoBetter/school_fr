import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import TeacherContext from '../../../context/teacher/TeacherContext'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import UnfinishedScoreReportDraftsContainer from './UnfinishedScoreReportDraftsContainer'
import WellcomeMessage from './WellcomeMessage'

export default function Home(){
    const {setDashboardInfo, dashboardInfo} = useContext(TeacherContext)
    const {authAxios} = useContext(FetchContext)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)


  useEffect(() => {

     authAxios.get('api/v1/teacher_dashboards').then((res) => {
      console.log(res)

      const {score_report_drafts, score_types, subjects, term_dates, teacher} = res.data 
      const newDashboardInfo = Object.assign({}, dashboardInfo)

      newDashboardInfo.unfinishedDrafts = score_report_drafts
      newDashboardInfo.termDates = term_dates
      newDashboardInfo.fullName = teacher.full_name 
      newDashboardInfo.scoreTypes = score_types
      newDashboardInfo.subjects = subjects
      
      setDashboardInfo(newDashboardInfo)
      setLoading(false)
     

    }).catch((err) => {
      console.log(err.response)
      // if(err.response.status === 401){
      //    history.push('/login')
      // }

    })

  }, [])


    return (
        <Box  >
            {
                loading ?
                <Loader /> :
                failed ?
                <FailedFetch height="calc(95vh - 200px)" message="Something Went Wrong" /> :
                <>

                <Box p={2} >
                  <WellcomeMessage />
                    {/* <Typography variant="h4" sx={{fontWeight: "bolder"}} >Unfinished Score Reports</Typography> */}
                </Box>
                <UnfinishedScoreReportDraftsContainer />


                </>
            }
            
        </Box>
    )
}