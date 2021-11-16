import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import { LoadingButton } from "@mui/lab";
import { FetchContext } from "../../../context/FetchContext";
import { AuthContext } from "../../../context/AuthContext";

// const validationSchema = yup.object({
//     name: yup
//     .string().required(),
//     class_teacher_id: yup
//     .number().required().positive()
// });

const validationSchema = yup.object({
    name: yup
    .string().required()
});

export default function ClassroomCreator() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const {teachers} = useContext(AdminContext).dashboardInfo
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const {setAuthState} = useContext(AuthContext)

    const formik = useFormik({

        initialValues: {
          name: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            
            authAxios.post('api/v1/classrooms', {classroom: values}).then((res) => {
                
                formik.resetForm()
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Created Classroom`
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
                newSnackBarInfo.message = `Failed to Create Classroom`
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
                <Typography variant="h5"> Create a new Classroom </Typography>
            </Box>
        
            <Grid container justify="center"  >
                <Grid xs={12} sm={6} >
                    <Box width="100%" p={1} >
                        
                        <TextField 
                        variant="outlined"
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        value={formik.values.name} 
                        
                        name="name"
                        label="Classroom Name" fullWidth/>
                    </Box>
                  
                </Grid>


                <Grid xs={12} sm={6}  >
                    <Box width="100%" p={1} >
                        
                       
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Class Teacher</InputLabel>
                            <Select
                            labelId="teacher-simple-select-label"
                            id="teacher-simple-select"
                            value={formik.values.class_teacher_id}
                            error={formik.touched.class_teacher_id && Boolean(formik.errors.class_teacher_id)}
                            helperText={formik.touched.class_teacher_id && formik.errors.class_teacher_id}
                            label="Class Teacher"
                            name="class_teacher_id"
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
                        <LoadingButton type="submit" loading={loading} variant="outlined" fullWidth >Create Classroom</LoadingButton>
                    </Box>
                  
                </Grid>

            </Grid>

            </Box>
        </form>
    )
}




