import { Autocomplete, Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import { LoadingButton } from "@mui/lab";
import { FetchContext } from "../../../context/FetchContext";
import { Bookmark, BookmarkRounded, CheckBox, CheckBoxOutlineBlankRounded } from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";

const validationSchema = yup.object({
    title: yup
    .string().required(),
    amount: yup
    .number().required().positive(),
    optional: yup
    .boolean()
});

export default function BillReportCreator() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [classroom_ids, setClassroomIds] = useState([])
    const {classrooms} = useContext(AdminContext).dashboardInfo
    const {setAuthState} = useContext(AuthContext)


    const formik = useFormik({

        initialValues: {
         title: '',
         optional: false,
         amount: 1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)

            
            authAxios.post('api/v1/bill_reports', {bill_report: values, classroom_ids: classroom_ids}).then((res) => {
               
                formik.resetForm()
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Created Bill Report`
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
                newSnackBarInfo.message = `Failed to Create Bill Report`
                newSnackBarInfo.severity = 'warning'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
            })
        
        },

    }); 

    return (
        <form onSubmit={formik.handleSubmit}>
        <Box >
            <Box p={2}>
                <Typography variant="h5"> Create a new Bill Report </Typography>
            </Box>
        
            <Grid container justify="center"  >
                <Grid xs={12} sm={6}  >
                    <Box width="100%" p={1} >
                        
                        <TextField 
                        variant="standard"
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        value={formik.values.title} 
                        name="title"
                        label="Bill Title" fullWidth/>
                    </Box>
                  
                </Grid>

                <Grid xs={6} sm={3}  >
                    <Box width="100%" p={1} >
                        <TextField 
                            variant="standard"
                            onChange={formik.handleChange}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                            value={formik.values.amount} 
                            name="amount"
                            label="Amount" fullWidth/>
                        
                    </Box>
                  
                </Grid>

                <Grid xs={6} sm={3}  >
                    <Box width="100%" p={2} >
                        <FormControlLabel 
                            label="Optional"
                            
                            control = {
                                <Checkbox
                                onChange={formik.handleChange}
                                
                                value={formik.values.optional} 
                                name="optional"
                                icon={<Bookmark />}
                                checkedIcon={<BookmarkRounded />}
                                />
                            }
                        />
                        
                        
                    </Box>
                  
                </Grid>

                <Grid xs={12} >
                    <Box width="100%" p={1} >
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={classrooms}
                        onChange={(event, value) => {
                            console.log(value)
                            setClassroomIds(value.map(classroom => classroom.id))
                        }}
                        
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankRounded fontSize="small" />}
                                checkedIcon={<CheckBox fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.name}
                            </li>
                        )}
                        fullWidth
                        renderInput={(params) => (
                            <TextField size="small" {...params} label="Classrooms" placeholder="Classrooms" />
                        )}
                    />
                    </Box>
                  
                </Grid>

                <Grid xs={12} alignSelf="center" >
                    <Box width="100%"  p={1} >
                        <LoadingButton type="submit" loading={loading} variant="outlined" fullWidth >Create Bill Report</LoadingButton>
                    </Box>
                  
                </Grid>

            </Grid>

            </Box>
        </form>
    )
}




