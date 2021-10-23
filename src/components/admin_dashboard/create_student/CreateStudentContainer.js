import { LoadingButton } from '@mui/lab';
import { Box, Container, Input, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FetchContext } from '../../../context/FetchContext';

export default function CreateStudentContainer(){

    const [image, setImage] = useState(null)

    const {authAxios} = useContext(FetchContext)


const validationSchema = yup.object({
    first_name: yup
        .string().required(),
    middle_name: yup
        .string().required(),
    last_name: yup
        .string().required()
  });


  const formik = useFormik({
    initialValues: {
     
      first_name: '',
      middle_name: '',
      last_name: '',
      classroom_id: 1,
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //submitCredentials(values)

      console.log(values)

      const formData = new FormData();
    // formData.append('first_name', values.first_name);
    // formData.append('last_name', values.last_name);
    // formData.append('middle_name', values.middle_name);
    // formData.append('email', values.email);
    // formData.append('password', values.password);
      formData.append('image', image);

    
    authAxios.post('api/v1/student_auth/', formData ).then((res) => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
      
    },
});
  

    return (
        <Box  sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", flexDirection: "column" }} >
            <form onSubmit={formik.handleSubmit}> 
                <Box  width="100%">
                    <Paper elevation={0}  >
                        
                        
                        <Box p={2} >
                             <TextField 
                                fullWidth label="First Name" 
                                id="fullWidth" 
                                name="first_name"
                                
                                
                                onChange={formik.handleChange}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.email && formik.errors.first_name}
                                value={formik.values.first_name}  
                                
                                
                            />

                        </Box>

                        <Box p={2} >
                             <TextField 
                                fullWidth label="Middle Name" 
                                id="fullWidth" 
                                name="middle_name"
                                
                                
                                onChange={formik.handleChange}
                                error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}
                                helperText={formik.touched.email && formik.errors.middle_name}
                                value={formik.values.middle_name}  
                                
                                
                            />

                        </Box>

                        <Box p={2} >
                             <TextField 
                                fullWidth label="Last Name" 
                                id="fullWidth" 
                                name="last_name"
                                
                                
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.email && formik.errors.last_name}
                                value={formik.values.last_name}  
                                
                                
                            />

                        </Box>

                        <Box p={2} >

                         <input type="file" name="image" accept="image/*"
                            onChange={(event) => {

                                setImage(event.target.files[0])
                            }}
                        />
                             

                        </Box>



                        <Box p={2} >
                            <Container maxWidth="xs" >
                            <LoadingButton   type="submit" fullWidth  variant="outlined">
                                Create
                            </LoadingButton>
                            </Container>
                           
                        </Box>
                    
                    </Paper>
                
                </Box>
                </form>
            </Box>
    )
}