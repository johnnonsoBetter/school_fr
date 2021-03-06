import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { Box, Container, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FetchContext } from '../../../context/FetchContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AdminContext from '../../../context/admin/AdminContext';
import { AuthContext } from '../../../context/AuthContext';

export default function CreateStudentContainer(){

    const [image, setImage] = useState({})
    const {classrooms} = useContext(AdminContext).dashboardInfo
    const {authAxios} = useContext(FetchContext)
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toDateString())
    const [dateOfAdmission, setDateOfAdmission] = useState(new Date().toDateString())
    
    const [religions, setReligions] = useState(["Christainity", "Muslim"])
    const [btnLoading, setBtnLoading] = useState(false)
    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const [src, setSrc] = useState('/images/no-pictures.png')
    const genders = ["Male", "Female"]
    const {setAuthState} = useContext(AuthContext)

    

    // const validationSchema = yup.object({
    //     first_name: yup
    //         .string().required(),
    //     middle_name: yup
    //         .string().required(),
    //     last_name: yup
    //         .string().required(),
    //     address: yup
    //         .string().required(),
    //     classroom_id: yup
    //         .number().positive(),
    //     religion: yup
    //         .string().required(),
    //     state: yup
    //         .string().required(),
    //     lga: yup
    //         .string().required(),
    //     middle_name: yup
    //         .string().required(),
    //     gender: yup
    //         .string().required(),
    //     admission_no: yup 
    //         .string().required()
            
    // });

    const validationSchema = yup.object({
        first_name: yup
            .string().required(),
        middle_name: yup
            .string(),
        last_name: yup
            .string().required(),
        classroom_id: yup
            .number().positive(),
        gender: yup
            .string().required(),
       
            
    });


    // initialValues: {
     
    //     first_name: '',
    //     middle_name: '',
    //     last_name: '',
    //     classroom_id: -1,
    //     address: '',
    //     gender: 'Male',
    //     state: '',
    //     lga: '',
    //     religion: 'Christainity',
    //     gender: '',
    //     admission_no: ''
  
        
    //   },

  const formik = useFormik({
    initialValues: {
     
      first_name: '',
      middle_name: '',
      last_name: '',
      classroom_id: -1,
      gender: '',
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //submitCredentials(values)

    setBtnLoading(true)
    const formData = new FormData();
   
    // formData.append('email', values.email);
    // formData.append('password', values.password);
    formData.append('image', image);
    formData.append('first_name', values.first_name)
    formData.append('middle_name', values.middle_name)
    formData.append('last_name', values.last_name)
    formData.append('lga', values.lga)
    formData.append('address', values.address)
    formData.append('state', values.state)
    formData.append('religion', values.religion)
    formData.append('classroom_id', values.classroom_id)
    formData.append('date_of_birth', dateOfBirth)
    formData.append('date_of_admission', dateOfAdmission)
    formData.append('gender', values.gender)
    formData.append('admission_no', values.admission_no)

    authAxios.post('api/v1/student_auth/', formData ).then((res) => {
        
        formik.resetForm()
        const newSnackBarInfo = Object.assign(snackInfo, {})
        newSnackBarInfo.message = `Succesfully Created Student`
        newSnackBarInfo.severity = 'success'
        setSnackInfo(newSnackBarInfo)
        setOpenSnack(true)
        setBtnLoading(false)

    }).catch(err => {

        const {status} = err.response 
        if (status === 401){
            setAuthState({})
        }
    
        const newSnackBarInfo = Object.assign(snackInfo, {})
        newSnackBarInfo.message = `Failed to Create Student`
        newSnackBarInfo.severity = 'warning'
        setSnackInfo(newSnackBarInfo)
        setOpenSnack(true)
        setBtnLoading(false)
    })
      
    },
});



    return (
        <>
        <Box p={2} >
            <Typography variant="h4" fontWeight={800} > Create A New Student</Typography>
        </Box>
        
        <form onSubmit={formik.handleSubmit}> 
               
        <Grid container >

            <Grid item xs={12} sm={6} >
                
                <Box p={2} m={2} maxHeight="280px" display="flex" justifyContent="center"  width="100%">

                    <Paper elevation={7} sx={{borderRadius: "15px", width: 270, display: 'flex', justifyContent: 'center'}}  >
                        <img src={src} style={{maxWidth: "100%", borderRadius: "15px", minHeight: "250px", minWidth: "270px"}}  />
                    </Paper>
                
                    

                </Box>

            </Grid>

          

             <Grid item xs={12} sm={6}  >
               
                <Box p={2} >
                

                    <input type="file" name="image" accept="image/*"
                        onChange={(event) => {

                            setImage(event.target.files[0])
                            setSrc(URL.createObjectURL(event.target.files[0])) 
                        }}
                    />

                </Box>

                <Box p={2} >
                <TextField 
                    fullWidth label="First Name" 
                    id="fullWidth" 
                    name="first_name"
                    onChange={formik.handleChange}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
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
                    helperText={formik.touched.middle_name && formik.errors.middle_name}
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
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    value={formik.values.last_name}  
                    
                    
                />

            </Box>

        </Grid>

            
    
        <Grid item xs={12} sm={6} >
            <Box p={2} display="flex" justifyContent="space-around" >
                <FormControl sx={{m: 1}} >
                    
                    Date Of Birth
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={dateOfBirth}
                        onChange={(newValue) => {
                            setDateOfBirth(newValue);
                            
                        }}
                        renderInput={(params) => <TextField size="small" fullWidth  {...params} />}
                    />

                    </LocalizationProvider>
                </FormControl>

                {/* <FormControl sx={{m: 1}} >
                    
                    Date Of Adm
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={dateOfAdmission}
                        onChange={(newValue) => {
                            setDateOfAdmission(newValue);
                            
                        }}
                        renderInput={(params) => <TextField size="small" fullWidth  {...params} />}
                    />

                    </LocalizationProvider>
                </FormControl> */}
            

            </Box>
            
        </Grid>




        <Grid item xs={12} sm={6} >
            <Box p={2} >
            <FormControl sx={{mr: 3, mt: 3}} fullWidth >
                <InputLabel> Classroom</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.classroom_id}
                error={formik.touched.classroom_id && Boolean(formik.errors.classroom_id)}
                helperText={formik.touched.classroom_id && formik.errors.classroom_id}
                label="Classroom"
                name="classroom_id"
                onChange={formik.handleChange}
                fullWidth
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

        {/* <Grid item xs={12} sm={6} >
            <Box p={2} >
            <FormControl fullWidth >
                <InputLabel> Religion</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.religion}
                error={formik.touched.religion && Boolean(formik.errors.religion)}
                helperText={formik.touched.religion && formik.errors.religion}
                label="Religion"
                name="religion"
                onChange={formik.handleChange}
                fullWidth
                >
                    
                
                    {
                        religions.map((religion) => {

                            return (
                            <MenuItem key={religion} value={religion}> {religion}</MenuItem>
                            )
                        })
                    }
            </Select>
            </FormControl>

            
            </Box>
            
        </Grid> */}


        <Grid item xs={12} sm={3} >
            <Box p={2} >
            <FormControl  fullWidth >
                <InputLabel> Gender</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.gender}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                label="Gender"
                name="gender"
                onChange={formik.handleChange}
                fullWidth
                >
                    
                
                    {
                        genders.map((gender) => {

                            return (
                            <MenuItem key={gender} value={gender}> {gender}</MenuItem>
                            )
                        })
                    }
            </Select>
            </FormControl>
            </Box>
        </Grid>
        {/* <Grid item xs={12} sm={3} >
            <Box p={2} >
                <TextField 
                    fullWidth label="Admission No" 
                    id="fullWidth" 
                    name="admission_no"

                    onChange={formik.handleChange}
                    error={formik.touched.admission_no && Boolean(formik.errors.admission_no)}
                    helperText={formik.touched.admission_no && formik.errors.admission_no}
                    value={formik.values.admission_no}  
                    
                    
                />

            </Box>
            
        </Grid> */}



        {/* <Grid item xs={12} sm={6} >
            <Box p={2} >
                <TextField 
                    fullWidth label="ResidentialAddress" 
                    id="fullWidth" 
                    name="address"

                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    value={formik.values.address}  
                    
                    
                />

            </Box>
            
        </Grid>
       

        <Grid item xs={12} sm={3} >
            <Box p={2} >
                <TextField 
                    fullWidth label="State Of Origin" 
                    id="fullWidth" 
                    name="state"

                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    value={formik.values.state}  
                    
                    
                />

            </Box>
            
        </Grid>

        <Grid item xs={12} sm={3} >
            <Box p={2} >
                <TextField 
                    fullWidth label="LGA" 
                    id="fullWidth" 
                    name="lga"

                    onChange={formik.handleChange}
                    error={formik.touched.lga && Boolean(formik.errors.lga)}
                    helperText={formik.touched.lga && formik.errors.lga}
                    value={formik.values.lga}  
                    
                    
                />

            </Box>
            
        </Grid> */}

        <Grid item xs={12} >
           
            <Box p={2} >
                <Container maxWidth="xs" >
                <LoadingButton loading={btnLoading}   type="submit" fullWidth  variant="outlined">
                    Create
                </LoadingButton>
                </Container>
            
            </Box>
        </Grid> 
       

        </Grid>
       
</form>

</>
        
    )
}