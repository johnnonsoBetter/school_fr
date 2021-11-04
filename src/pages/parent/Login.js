import { LoadingButton } from '@mui/lab'
import { Alert, Box, Checkbox, Container, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { publicFetch } from '../.../../../utils/fetch';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const validationSchema = yup.object({
    email: yup
      .string('Enter your school email')
      .email('Enter a valid school email')
      .required('School email is required'),
    password: yup
      .string('Enter your password')
      .min(0, 'Password should be of minimum 7 characters length')
      .required('Password is required'),
  });
  
  

export default function Login(){

  const [loginLoading, setLoginLoading] = useState(false)
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const {setAuthState} = useContext(AuthContext)
  const [checked, setChecked] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [snackInfo, setSnackInfo] = useState({
    message: '',
    severity: ''
  })

  const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        submitCredentials(values)
        
      },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };







    const submitCredentials = (values) => {

      // console.log(values)

      setLoginLoading(true)
        
      publicFetch.post(
        `api/v1/guidance_auth/sign_in`,
        values
      ).then((response) => {
        
        const token = response.headers['access-token']
        const expiry = response.headers['expiry']
        const client = response.headers['client']
        const uid = response.headers['uid']
        const userInfo = response.data['data']
        window.location.href = '/dashboard'
        setAuthState({token, expiresAt: expiry, userInfo, client, uid, rememberDevice: checked})
         
     
          
      }).catch((err) => {                                             
        
       
        const {status, data} = err.response
        const {errors} = data
        const newSnackInfo = Object.assign(snackInfo, {})
        

        if (status === 401 && errors[0] === "Invalid login credentials. Please try again."){
          newSnackInfo.message = errors[0]
        }else{
          newSnackInfo.message = "Something went wrong"
        }

        setSnackInfo(newSnackInfo)


        setSnackInfo(newSnackInfo)
        setLoginLoading(false)
        setLoginError(true)

       
      

       
      })
    }

    useEffect(() => {

      return () => {
        setRedirectOnLogin(false)
      }
    }, [])


    return (
        <>
        {redirectOnLogin && <Redirect to="/dashboard" /> }
        <Container maxWidth="sm" >
        <Snackbar open={loginError} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'  sx={{ width: '100%' }}>
              {snackInfo.message}
              
            </Alert>
          </Snackbar>
            <Box  sx={{ display: "flex", justifyContent: "center", alignItems: "center"}} >
            <form onSubmit={formik.handleSubmit}> 
                <Box  width="100%">
                    <Paper elevation={0} sx={{padding: "20px"}} >
                        <Box p={2} textAlign="center" m={5} marginBottom={0} >
                             <Typography variant="h4" sx={{letterSpacing: "0em", fontWeight: "450"}}> Welcome To Parent's Login</Typography>

                        </Box>
                        <Box p={2} textAlign="center"  >
                             <Typography variant="h6" sx={{letterSpacing: "0em", fontWeight: "450"}}> Please Login!</Typography>

                        </Box>
                        <Box p={2} >
                             <TextField 
                                fullWidth  
                                label="School Email"  
                                id="fullWidth"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                             />

                        </Box>

                        <Box p={2} >
                        <FormControl sx={{width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                              
                                  name="password"
                                  fullWidth
                                  type={showPassword ? 'text' : 'password'}
                                  onChange={formik.handleChange}
                                  error={formik.touched.email && Boolean(formik.errors.password)}
                                  helperText={formik.touched.email && formik.errors.password}
                                  value={formik.values.password}  
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Password"
                                />
                            </FormControl>

                        </Box>

                        {/* <Box p={2}  display="flex" justifyContent= "center"  >
                            <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Remember Device After Login" />
                        </Box> */}

                        <Box p={2} >
                            <Container maxWidth="xs" >
                            <LoadingButton loading={loginLoading}  type="submit" fullWidth  variant="outlined">
                                Login
                            </LoadingButton>
                            </Container>
                           
                        </Box>
                    
                    </Paper>
                
                </Box>
                </form>
            </Box>
        </Container>
        </>
    )
}