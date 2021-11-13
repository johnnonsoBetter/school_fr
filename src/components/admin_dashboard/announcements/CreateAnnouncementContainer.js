import { AddAPhotoOutlined, CheckCircleRounded } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, ButtonBase, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { green } from '@mui/material/colors'
import { useHistory } from 'react-router-dom'
import AdminContext from '../../../context/admin/AdminContext'
import { AuthContext } from '../../../context/AuthContext'


export default function CreateAnnouncementContainer() {


    const {authAxios} = useContext(FetchContext)
    
    const {announcementImages} = useContext(AdminContext).dashboardInfo
    const [btnLoading, setBtnLoading] = useState(false)
    const [announcement_image_id, setAnnouncementImageId] = useState(announcementImages[0].id)
    const history = useHistory()
    const {setAuthState} = useContext(AuthContext)


    const validationSchema = yup.object({
        
        message: yup.string().required()
        
    });

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            if (announcement_image_id === -1)
                return
            
            setBtnLoading(true)

            authAxios.post(`api/v1/announcements/`, {announcement: {message: values.message, announcement_image_id: announcement_image_id}})
            .then((res) => {
          
                 history.push('/announcements')
                 setBtnLoading(false)
               
            }).catch((err) => {

                const {status} = err.response 
                if (status === 401){
                    setAuthState({})
                }
                setBtnLoading(false)
                
                
            })
        
        },
    }); 
    
   

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Create Announcement</Typography>

        </Box>
        <Box >

        
            <form onSubmit={formik.handleSubmit}>  
                <Box  display="flex" justifyContent="flex-end" >

                    <Box display="flex" alignItems="center" >

                        <TextField 
                        
                        name="message" 
                    
                        value={formik.values.message}
                    
                        onChange={formik.handleChange}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        value={formik.values.message} 
                        label="Message" />
                        <LoadingButton loading={btnLoading} type="submit" > <AddAPhotoOutlined /> </LoadingButton>

                    </Box>

                    
                </Box>
               <Grid container  >

                   {
                       announcementImages.map((ann) => {

                            const isTrue = ann.id === announcement_image_id


                           return (
                               <Grid key={ann.id} xs={12} sm={6} md={4} > 
                                    <Box p={2} >


                                    
                                    <ButtonBase onClick={() => setAnnouncementImageId(ann.id)}  >

                                    <Paper 
                                        
                                        elevation={5} 
                                        sx={{
                                            width: "100%", 
                                            
                                            borderRadius: "15px",
                                            position: "relative"
                                        }}
                                        >


                                        <Box >

                                            <Box p={1} borderRadius="15px"  >
                                                <img src={ann.image} style={{maxWidth: "100%"}} alt="announcementimages" />
                                            </Box>

                                            <Box display="flex" justifyContent="space-between" alignItems="center"  p={2}>
                                                <Typography variant="h6" textAlign="left"  fontWeight="bolder"> {ann.title} </Typography>
                                                
                                                
                                                {
                                                    isTrue && <CheckCircleRounded  sx={{color: green[400]}}/>
                                                }


                                                

                                            </Box>
                                        
                                        </Box>
                   
                                    </Paper>
                                    </ButtonBase>
                                    </Box>
                                </Grid>
                           )
                       })
                   }
               </Grid>
            </form> 
        

         </Box>
    </>
    )
}