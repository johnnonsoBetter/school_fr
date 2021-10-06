import { Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Paper, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FetchContext } from '../../../../context/FetchContext';
import TeacherContext from '../../../../context/teacher/TeacherContext';



const validationSchema = yup.object({
    score: yup
      .string('score')
      .required('score'),
   
});



export default function StudentDraftForm(props){
    const {full_name, score, id} = props.studentDraft
    const {setStudentDrafts, studentDrafts, isRemovable} = props
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const {setOpenSnack, setSnackInfo, snackInfo} = useContext(TeacherContext)
    
    


    const formik = useFormik({
        initialValues: {
        score: score,
        id: id
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            
            
            authAxios.put(`api/v1/student_score_report_drafts/${id}`, {  student_score_report_draft: {score: values.score, scored: true}}).then((res) => {
                console.log(res)

                const {id, score} = res.data
                const newSnackInfo = Object.assign({}, snackInfo)
                newSnackInfo.message = `Scored ${full_name} ${score}`
                newSnackInfo.severity = "success"
                setSnackInfo(newSnackInfo)
                if (isRemovable) {
                    const filteredDrafts = studentDrafts.filter((studentDraft) => (studentDraft.id !== id ))
                    setStudentDrafts(filteredDrafts)

                }
               
                setOpenSnack(true)
                setLoading(false)
                
                

            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
        
        },
    }); 




    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3}  >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography sx={{fontWeight: "bold"}}> {full_name} </Typography>

                    
                   
                       
                            <form onSubmit={formik.handleSubmit} >
                                <Box display="flex" alignItems="center" justifyContent="flex-end" >
                                
                                <Avatar sizes="small" sx={{width: 31, height: 31, marginRight: "10px", backgroundColor: "#000000", fontWeight: "bolder"}} > {formik.values.score}</Avatar>
                                
                                <TextField 
                                    name="score"
                                    onChange={formik.handleChange}
                                    error={formik.touched.score && Boolean(formik.errors.score)}
                                    helperText={formik.touched.score && formik.errors.score}
                                    value={formik.values.score}  
                                    type="number" size="small"  sx={{height: "100%", width: "65px", textAlign: "center", fontWeight: "bolder"}} />
                            
                                <LoadingButton loading={loading} type="submit" size="small" endIcon={<Send />} sx={{color: "#d5220f"}} >
                                    
                                </LoadingButton>
                                
                                
                            </Box>
                           </form>
                       
                        
                   
                </Box>

            </Paper>
        </Box>
    )
} 
