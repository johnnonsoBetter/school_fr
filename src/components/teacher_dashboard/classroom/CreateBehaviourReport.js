import React, { useContext, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import {  BarChartRounded, CancelRounded, GppBadRounded, GppGoodRounded, NotificationsRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import * as yup from 'yup';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import { Avatar, FormControl, MenuItem, Select, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import { blue} from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';
import { FetchContext } from '../../../context/FetchContext';
import TeacherContext from '../../../context/teacher/TeacherContext';

export default function CreateBehaviourReport({id, full_name}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const {setOpenSnack, setSnackInfo, snackInfo} = useContext(TeacherContext)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const validationSchema = yup.object({
        
        title: yup.string().required(),
        description: yup.string().required(),
        behaviour_type: yup.string().required()
    
    });


    const formik = useFormik({
        initialValues: {
        title: '',
        description: '',
        behaviour_type: 'Good'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)

            authAxios.post(`api/v1/teacher_behaviour_reports/`, 
                { 
                        behaviour_report: 
                        {title: values.title, behaviour_type: values.behaviour_type, description: values.description},
                        student_id: id
                    
                })
            .then((res) => {
                console.log(res)

                
                const newSnackInfo = Object.assign({}, snackInfo)
                newSnackInfo.message = `Reported ${full_name} `
                newSnackInfo.severity = "success"
                setSnackInfo(newSnackInfo)
              
                setOpenSnack(true)
                setLoading(false)
                handleClose()
                
                
                
                

            }).catch((err) => {
                setLoading(false)
                // console.log(err)
                
                const newSnackInfo = Object.assign({}, snackInfo)
                newSnackInfo.message = `Failed To Report ${full_name} `
                newSnackInfo.severity = "error"
                setSnackInfo(newSnackInfo)
              
                setOpenSnack(true)
                setLoading(false)
                
            })
        
        },
    }); 
  
 
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
         
          <Tooltip title="Report Info">
            <IconButton>
                
                <Avatar variant="rounded" onClick={handleClick} sx={{ bgcolor: blue[100], color: blue[700] }}>
                    <NotificationsRounded />
                </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          
          PaperProps={{
            elevation: 0,
            style: {
              
              width: '29ch',
              borderRadius: "20px"
            },
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
         
         <Box p={2} >
             <form onSubmit={formik.handleSubmit} > 
             <Stack rowGap={2} >
                 <Box display="flex" alignItems="center" justifyContent="space-between" >
                    <Typography sx={{textTransform: "capitalize"}}>{full_name}</Typography>
                     <IconButton onClick={handleClose}>
                         <CancelRounded />
                     </IconButton>
                 </Box>
                 <TextField name="title" 
                 
                 value={formik.values.title}
                
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                value={formik.values.title} 
                 
                 size="small" label="Title" />

                    <FormControl >
                                    
                        <Select
                        name="behaviour_type"
                        size="small"
                        onChange={formik.handleChange}
                       
                        value={"Good"}  
                        // onChange={(e, value) => {
                           

                        // }}
                        >

                            <MenuItem value="Good">Good</MenuItem>
                            <MenuItem value="Bad">Bad</MenuItem>
                        </Select>
                    </FormControl>
                 <TextField 
                 name="description"
                 onChange={formik.handleChange}
                 error={formik.touched.description && Boolean(formik.errors.description)}
                 helperText={formik.touched.description && formik.errors.description}
                 value={formik.values.description}  placeholder="Enter Report"  
                 type="text" 
                 style={{ width: "100%", maxWidth: "100%", minWidth: "100%" }} />

                 

                 <LoadingButton loading={loading} type="submit">
                     Report
                 </LoadingButton>
             </Stack>
             </form>
         </Box>
             
         
  
        </Menu>
      </React.Fragment>
    );
  }
  