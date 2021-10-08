import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';
import { UnscoredStudentDraftsProvider } from '../../../../context/teacher/UnscoredDraftReportContext';
import GroupedStudentFilterInput from './GroupedStudentFilterInput';
import StudentDraftForm from './StudentDraftForm';
import {FetchContext} from '../../../../context/FetchContext'
import { useEffect } from 'react';
import { useState } from 'react';
import EditStudentDraftContext from '../../../../context/teacher/EditStudentDraftContext';
import Loader from '../../../utilities/Loader';
import FailedFetch from '../../../utilities/FailedFetch';
import Empty from '../../../utilities/Empty';


export default function UnscoredStudentDrafts(){

    const [loading, setLoading] = React.useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = React.useContext(FetchContext)
    const [unscoredStudentDrafts, setUnscoredStudentDrafts] =  useState([])
    const {id, scoreReportDraft} = React.useContext(EditStudentDraftContext)
    const [filteredUnscoredStudentDrafts, setFilteredUnscoredDrafts] = useState([])


    console.log(scoreReportDraft, "ddd")

    useEffect(() => {

      authAxios.get('/api/v1/student_score_report_drafts', {params: {scored: false, score_report_draft_id: id}}).then((res) => {
        
        setUnscoredStudentDrafts(res.data)
        setFilteredUnscoredDrafts(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
        setFailed(true)
      })

    }, [])


    


    return (
        <Box >
          <UnscoredStudentDraftsProvider
            value={{
              unscoredStudentDrafts,
              filteredUnscoredStudentDrafts,
              setUnscoredStudentDrafts: (unscoredStudentDrafts) => {
                setUnscoredStudentDrafts(unscoredStudentDrafts)
              }
              

            }}
          >
            {
              loading ? <Loader /> :
              failed ? <FailedFetch /> :
            
              <> 
                {
                  unscoredStudentDrafts.length === 0 ? 
                  <Empty message={`No Unmarked ${scoreReportDraft.scoreType}`} height="calc(85vh - 200px)" /> :
                  <>
                  <GroupedStudentFilterInput />
                  <Box marginTop={2} >
                    <Grid container >

                      {
                        unscoredStudentDrafts.map((studentDraft) => {
                        
                          return (
                            <Grid item xs={12} sm={6} key={studentDraft.id}  >
                              
                                <StudentDraftForm isRemovable={true} setStudentDrafts={setUnscoredStudentDrafts} studentDrafts={unscoredStudentDrafts} studentDraft={studentDraft} />
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
          </UnscoredStudentDraftsProvider>
         
        </Box>
    )
}