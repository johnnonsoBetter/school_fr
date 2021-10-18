import { Box, Grid, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import { LoadingButton } from "@mui/lab";
import { FetchContext } from "../../../context/FetchContext";

const validationSchema = yup.object({
    title: yup
    .string().required(),
    amount: yup
    .number().required().positive().integer(),
   
    
});


export default function ExpenseCreator() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)



    const formik = useFormik({
        initialValues: {
          title: '',
          amount: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            
            authAxios.post('api/v1/expense_reports', {expense_report: values}).then((res) => {
                console.log(res)
            
                formik.resetForm()
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Created Expense`
                newSnackBarInfo.severity = 'success'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
    
            }).catch((err) => {
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Failed to Create Expense`
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
                <Typography variant="h5"> Create a new Expense </Typography>
            </Box>
        
            <Grid container justify="center"  >
                <Grid xs={12} sm={6} >
                    <Box width="100%" p={1} >
                        <TextField 
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        value={formik.values.title} 
                       
                        name="title"
                        label="Title" fullWidth/>
                    </Box>
                  
                </Grid>

                <Grid xs={12} sm={6}  >
                    <Box width="100%" p={1} >
                        <TextField 
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        value={formik.values.amount} 
                        type="number"
                        name="amount"
                        label="Amount" fullWidth/>
                    </Box>
                  
                </Grid>

               

                <Grid xs={12} alignSelf="center" >
                    <Box width="100%"  p={1} >
                        <LoadingButton type="submit" loading={loading} variant="outlined" fullWidth >Create Expense</LoadingButton>
                    </Box>
                  
                </Grid>

            </Grid>

            </Box>
        </form>
       
           
            
      

    )
}




