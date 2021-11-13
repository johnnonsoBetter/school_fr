import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import Loader from '../../utilities/Loader'
import FailedFetch from '../../utilities/FailedFetch'
import Empty from '../../utilities/Empty'
import ScoreReportDraft from './ScoreReportDraft'
import { AuthContext } from '../../../context/AuthContext'

export default function ScoreReportDraftContainer(){

    const {authAxios} = useContext(FetchContext)
    const [scoreReportDrafts, setScoreReportDrafts] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {setAuthState} = useContext(AuthContext)


    useEffect(() => {
        authAxios.get('api/v1/score_report_drafts').then((res) => {
            console.log(res)
            setScoreReportDrafts(res.data)
            setLoading(false)

        }).catch((err) => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setScoreReportDrafts([])
        }
    }, [])

    return (
        <Box >
           <Box p={2} >
                <Typography variant="h4" sx={{fontWeight: "bolder"}} > My Score Drafts</Typography>
            </Box>

           
               {
                   loading ?
                   <Loader /> :
                   failed ?
                   <FailedFetch height="calc(98vh - 200px)" message="Failed to fetch score draft" /> : 
                   <Box maxHeight="calc(100vh - 180px)" overflow="auto"  > 

                       {
                           scoreReportDrafts.length === 0 ? 
                           <Empty message="Score report draft is empty" height="calc(98vh - 200px)" /> :
                            <Grid container >
                            {
                                scoreReportDrafts.map((scoreReportDraft) => {

                                    return (
                                        <Grid zeroMinWidth key={scoreReportDraft.id} spacing={3} item xs={12} sm={6} md={6} lg={4}> 
                                            <ScoreReportDraft scoreReportDraft={scoreReportDraft} />
                                        </Grid>
                                    )
                                })
                            }
                            </Grid>
                       }

        

                    </Box>
                   
               }
          
        </Box>
    )
}