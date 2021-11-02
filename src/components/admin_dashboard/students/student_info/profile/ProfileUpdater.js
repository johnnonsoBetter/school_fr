import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import { Box, Button, Container, FormControl, Grid, Grow, IconButton, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AdminContext from '../../../../../context/admin/AdminContext';
import { FetchContext } from '../../../../../context/FetchContext';
import Loader from '../../../../utilities/Loader';
import FailedFetch from '../../../../utilities/FailedFetch';


export default function ProfileUpdater(props){

    const {setOpenUpdater, student} = props


    const {
        full_name, 
        first_name, 
        last_name, 
        date_of_birth, 
        middle_name, 
        state, 
        lga, 
        date_of_admission,
        religion,
        gender,
        admission_no,
        address,
        classroom_id,
    } = props.student
    

    const [image, setImage] = useState()

    const {authAxios} = useContext(FetchContext)
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toDateString())
    const [dateOfAdmission, setDateOfAdmission] = useState(new Date().toDateString())
    const [classrooms, setClassrooms] = useState([{name: "nan/", id: -1}])
    const religions = ["Christainity", "Muslim"]
    const [btnLoading, setBtnLoading] = useState(false)
    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const genders = ["Male", "Female"]
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)

    const [src, setSrc] = useState( props.student.image !== null ? props.student.image : '/images/no-pictures.png')

    

    useEffect(() => {
        authAxios.get('api/v1/classrooms').then((res) => {
            const {data} = res 
            setClassrooms(data)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            setFailed(true)
        })
    }, [])

    const validationSchema = yup.object({
        first_name: yup
            .string().required(),
        middle_name: yup
            .string().required(),
        last_name: yup
            .string().required(),
        address: yup
            .string().required(),
        classroom_id: yup
            .number().positive(),
        religion: yup
            .string().required(),
        state: yup
            .string().required(),
        lga: yup
            .string().required(),
        middle_name: yup
            .string().required(),
        gender: yup
            .string().required(),
        admission_no: yup 
            .string().required()
            
    });

  const formik = useFormik({
    initialValues: {
     
      first_name,
      middle_name,
      last_name,
      classroom_id: classroom_id,
      address,
      gender,
      state,
      lga,
      religion,
      gender,
      admission_no

      
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

    // authAxios.post('api/v1/student_auth/', formData ).then((res) => {
        
    //     formik.resetForm()
    //     const newSnackBarInfo = Object.assign(snackInfo, {})
    //     newSnackBarInfo.message = `Succesfully Updated Student`
    //     newSnackBarInfo.severity = 'success'
    //     setSnackInfo(newSnackBarInfo)
    //     setOpenSnack(true)
    //     setBtnLoading(false)

    // }).catch(err => {
    //     console.log(err)
    //     const newSnackBarInfo = Object.assign(snackInfo, {})
    //     newSnackBarInfo.message = `Failed to Update Student`
    //     newSnackBarInfo.severity = 'warning'
    //     setSnackInfo(newSnackBarInfo)
    //     setOpenSnack(true)
    //     setBtnLoading(false)
    // })
      
    },
});



    return (

        <>



        {

        loading ? <Loader /> :
        failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :
        <Grow in={true} >

       
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
               
                <Box p={2} display="flex" justifyContent="space-around" alignItems="center" >
                

                    <input type="file"  name="image" accept="image/*"
                        onChange={(event) => {

                            setImage(event.target.files[0])
                            setSrc(URL.createObjectURL(event.target.files[0])) 
                        }}
                    />

                    <Button variant="outlined" color="secondary"  onClick={() => setOpenUpdater(false)} >
                        Back 
                    </Button>

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

                <FormControl sx={{m: 1}} >
                    
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
                </FormControl>
            

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

        <Grid item xs={12} sm={6} >
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
            
        </Grid>


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
        <Grid item xs={12} sm={3} >
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
            
        </Grid>



        <Grid item xs={12} sm={6} >
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
            
        </Grid>

        <Grid item xs={12} >
           
            <Box p={2} >
                <Container maxWidth="xs" >
                <LoadingButton loading={btnLoading}   type="submit" fullWidth  variant="outlined">
                    Update Profile
                </LoadingButton>
                </Container>
            
            </Box>
        </Grid> 
       

        </Grid>
       
</form>

</Grow>
}
</>
    )
}