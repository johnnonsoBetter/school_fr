import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TeacherContext from '../../context/teacher/TeacherContext';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';



const validationSchema = yup.object({
    max: yup
    .number().required("max").positive().lessThan(101).integer(),
    score_type_id: yup
      .string('Enter your subject')
      .required('score Type is required'),
    subject_id: yup
    .string('Enter your subject')
    .required('subject is required'),
});
  
  

export default function CreateScoreReportDraft() {
 

  const descriptionElementRef = React.useRef(null);
  const {handleClose, handleClickOpen, open, dashboardInfo} = React.useContext(TeacherContext)
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const {authAxios} = useContext(FetchContext)
  const [redirectOnCreate, setRedirectOncreate] = React.useState(false)
  const [id, setId] = React.useState(null)

  React.useEffect(() => {
    if (open) {
      console.log("hello making")
      setId(null)
      setRedirectOncreate(false)
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const formik = useFormik({
    initialValues: {
      max: '1',
      score_type_id: dashboardInfo.scoreTypes[0].id,
      subject_id: dashboardInfo.subjects[0].id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        setLoading(true)
        authAxios.post('api/v1/score_report_drafts', {score_report_draft: values}).then((res) => {
            
            const {id} = res.data
            setId(id)
            formik.resetForm()
            setLoading(false)
            
            setRedirectOncreate(true)
           

        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    
    },
}); 


  return (
    <div>
      {redirectOnCreate && <Redirect to={`/score_report_drafts/${id}`}  />}
      <Dialog
        open={open}
       
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
          <form onSubmit={formik.handleSubmit}> 
        <DialogTitle id="scroll-dialog-title">Create A Score Report Draft</DialogTitle>
        <DialogContent dividers={'paper'}>
            
            <Box  >
                <Grid container >
                   

                    <Grid item xs={12} sm={4} >
                        <Box display="flex" m={2} flexDirection="column" alignItems="center" >
                           
                            <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                   
                                   <Select
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   
                                   name="subject_id"
                           
                           
                                   onChange={formik.handleChange}
                                   error={formik.touched.subject_id && Boolean(formik.errors.subject_id)}
                                   helperText={formik.touched.subject_id && formik.errors.subject_id}
                                   value={formik.values.subject_id}  
                                  
                                   >
                                   
                               
                                   {
                                       dashboardInfo.subjects.map((subject) => {
                                           return (
                                           <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                                           )
                                       })
                                   }
                                   </Select>
                               </FormControl>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <Box display="flex" m={2} flexDirection="column" alignItems="center" >
                           
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                   
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    
                                    name="score_type_id"
                            
                            
                                    onChange={formik.handleChange}
                                    error={formik.touched.score_type_id && Boolean(formik.errors.score_type_id)}
                                    helperText={formik.touched.score_type_id && formik.errors.score_type_id}
                                    value={formik.values.score_type_id}  
                                   
                                    >
                                    
                                
                                    {
                                        dashboardInfo.scoreTypes.map((scoreType) => {
                                            return (
                                            <MenuItem key={scoreType.id} value={scoreType.id}>{scoreType.name}</MenuItem>
                                            )
                                        })
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4} >
                        <Box display="flex"  m={2} flexDirection="column" alignItems="center" >
                           
                            <TextField 
                            name="max"
                            
                            
                            onChange={formik.handleChange}
                            error={formik.touched.max && Boolean(formik.errors.max)}
                            helperText={formik.touched.max && formik.errors.max}
                            value={formik.values.max}  
                            
                            type="number" label="Enter Score" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              history.goBack()

          }}>Cancel</Button>
          <LoadingButton loading={loading} type="submit">Create</LoadingButton>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
