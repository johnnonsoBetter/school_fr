import { LoadingButton } from '@mui/lab'
import { Box, Checkbox, Container, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { publicFetch } from '../.../../../utils/fetch';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, useHistory } from 'react-router-dom';


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
    const history = useHistory()
    const {isAuthenticated} = useContext(AuthContext)

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
        console.log(token)
        setAuthState({token, expiresAt: expiry, userInfo, client, uid, rememberDevice: checked})
        setRedirectOnLogin(true)
     
       //history.push('/muller')
       
          
      }).catch((err) => {                                             
        
       
        setLoginLoading(false)

       
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
                             <TextField 
                                fullWidth label="Password" 
                                id="fullWidth" 
                                name="password"
                                type="password"
                                
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.password)}
                                helperText={formik.touched.email && formik.errors.password}
                                value={formik.values.password}  
                                
                                
                            />

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