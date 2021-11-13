import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import { LoadingButton } from "@mui/lab";
import { FetchContext } from "../../../context/FetchContext";
import { AuthContext } from "../../../context/AuthContext";

const validationSchema = yup.object({
    name: yup
    .string().required(),
    classroom_id: yup
    .number().required("classroom must be present").positive(),
    teacher_id: yup
    .number().required("teacher must be present").positive()
});

export default function SubjectCreator() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const {classrooms, teachers} = useContext(AdminContext).dashboardInfo
    const {setAuthState} = useContext(AuthContext)

    const formik = useFormik({

        initialValues: {
          name: '',
          classroom_id: -1,
          teacher_id: -1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            console.log(values)
            setLoading(true)
            
            authAxios.post('api/v1/subjects', {subject: values}).then((res) => {
                console.log(res)
            
                formik.resetForm()
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Created Subject`
                newSnackBarInfo.severity = 'success'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
    
            }).catch((err) => {

                const {status} = err.response 
                if (status === 401){
                    setAuthState({})
                }
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Failed to Create Subject`
                newSnackBarInfo.severity = 'warning'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
            })
        
        },

    }); 

    return (
        <form onSubmit={formik.handleSubmit}>
        <Box>
            <Box p={2}>
                <Typography variant="h5"> Create a new Subject </Typography>
            </Box>
        
            <Grid container justify="center"  >
                <Grid xs={12}  >
                    <Box width="100%" p={1} >
                        
                        <TextField 
                        variant="standard"
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        value={formik.values.name} 
                        
                        name="name"
                        label="Subject Name" fullWidth/>
                    </Box>
                  
                </Grid>

                <Grid xs={12} sm={6}   >
                    <Box width="100%" p={1} >
                        
                       
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Classroom</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.classroom_id}
                            error={formik.touched.classroom_id && Boolean(formik.errors.classroom_id)}
                            helperText={formik.touched.classroom_id && formik.errors.classroom_id}
                            label="Classroom"
                            name="classroom_id"
                            onChange={formik.handleChange}
                            >
                                
                              
                                {
                                    classrooms.map((classroom) => {

                                        return (
                                        <MenuItem key={classroom.id} value={classroom.id}> {classroom.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                  
                </Grid>

                <Grid xs={12} sm={6}  >
                    <Box width="100%" p={1} >
                        
                       
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                            <Select
                            labelId="teacher-simple-select-label"
                            id="teacher-simple-select"
                            value={formik.values.teacher_id}
                            error={formik.touched.teacher_id && Boolean(formik.errors.teacher_id)}
                            helperText={formik.touched.teacher_id && formik.errors.teacher_id}
                            label="Teacher"
                            name="teacher_id"
                            onChange={formik.handleChange}
                            >
                                
                              
                                {
                                    teachers.map((teacher) => {

                                        return (
                                        <MenuItem key={teacher.id} value={teacher.id}> {teacher.full_name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                  
                </Grid>

                <Grid xs={12} alignSelf="center" >
                    <Box width="100%"  p={1} >
                        <LoadingButton type="submit" loading={loading} variant="outlined" fullWidth >Create Subject</LoadingButton>
                    </Box>
                  
                </Grid>

            </Grid>

            </Box>
        </form>
    )
}




