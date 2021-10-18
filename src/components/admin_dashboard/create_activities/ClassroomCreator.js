import { Box, Grid, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import { LoadingButton } from "@mui/lab";
import { FetchContext } from "../../../context/FetchContext";

const validationSchema = yup.object({
    name: yup
    .string().required()
});

export default function ClassroomCreator() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)

    const formik = useFormik({

        initialValues: {
          name: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            
            authAxios.post('api/v1/classrooms', {classroom: values}).then((res) => {
                console.log(res)
            
                formik.resetForm()
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Created Classroom`
                newSnackBarInfo.severity = 'success'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
    
            }).catch((err) => {
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
                <Grid xs={12}  >
                    <Box width="100%" p={1} >
                        
                        <TextField 
                        variant="standard"
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        value={formik.values.name} 
                        
                        name="name"
                        label="Classroom Name" fullWidth/>
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




