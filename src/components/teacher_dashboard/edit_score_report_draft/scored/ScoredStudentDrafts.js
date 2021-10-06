
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import { ScoredStudentDraftsProvider } from '../../../../context/teacher/ScoredDraftReportContext';
import GroupedStudentFilterInput from './GroupedStudentFilterInput';

import {FetchContext} from '../../../../context/FetchContext'
import { useEffect } from 'react';
import { useState } from 'react';
import EditStudentDraftContext from '../../../../context/teacher/EditStudentDraftContext';
import Loader from '../../../utilities/Loader';
import Empty from '../../../utilities/Empty';

import FailedFetch from '../../../utilities/FailedFetch';
import StudentDraftForm from '../unscored/StudentDraftForm';



export default function ScoredStudentDrafts(){

    const [loading, setLoading] = React.useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = React.useContext(FetchContext)
    const [scoredStudentDrafts, setScoredStudentDrafts] =  useState([])
    const {id, scoreReportDraft} = React.useContext(EditStudentDraftContext)
   

    useEffect(() => {

      authAxios.get('/api/v1/student_score_report_drafts', {params: {scored: true, score_report_draft_id: id}}).then((res) => {
        
        setScoredStudentDrafts(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
        setFailed(true)
      })

    }, [])


    


    return (
        <Box >
          <ScoredStudentDraftsProvider
            value={{
              scoredStudentDrafts,

            }}
          >
            {
              loading ? <Loader /> :
              failed ? <FailedFetch /> :

              
            
              <>

                {
                    scoredStudentDrafts.length === 0 ? 
                    <Empty message={`No Marked ${scoreReportDraft.scoreType}`} height="calc(85vh - 200px)" /> :
                    <>
                    <GroupedStudentFilterInput />
                    <Box marginTop={2} >
                      <Grid container >
  
                        {
                          scoredStudentDrafts.map((studentDraft) => {
                          
                            return (
                              <Grid item xs={12} sm={6} key={studentDraft.id}  >
                                
                                  <StudentDraftForm studentDraft={studentDraft} />
                              </Grid>
  
                            )
                          })
                        }
  
                      </Grid>
                    </Box>
  
                    </>
                }
                  
              </>

            }
          </ScoredStudentDraftsProvider>
         
        </Box>
    )
}

