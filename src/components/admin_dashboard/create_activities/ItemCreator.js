import { Box, Grid, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import { LoadingButton } from "@mui/lab";
import { FetchContext } from "../../../context/FetchContext";

const validationSchema = yup.object({
    name: yup
    .string().required(),
    selling_price: yup
    .number().required().positive().integer(),
    quantity: yup
    .number().required().moreThan(-1).integer(),
    
    
});


export default function ItemCreator() {

    const {setOpenSnack, snackInfo, setSnackInfo} = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)



    const formik = useFormik({
        initialValues: {
          name: '',
          selling_price: '',
          quantity: 0
    
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            
            authAxios.post('api/v1/items', {item: values}).then((res) => {
                console.log(res)
            
                formik.resetForm()
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Created Item`
                newSnackBarInfo.severity = 'success'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
 
              
              
               
    
            }).catch((err) => {
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Failed to Created Item`
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
                    <Typography variant="h5"> Create a new item </Typography>
                </Box>
            
                <Grid container justify="center"  >
                    <Grid xs={12} sm={4} >
                        <Box width="100%" p={1} >
                            <TextField 
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            value={formik.values.name}  
                            name="name"
                            sx={{textTransform: "capitalize"}}
                            label="Name" fullWidth/>
                        </Box>
                      
                    </Grid>

                    <Grid xs={12} sm={4}  >
                        <Box width="100%" p={1} >
                            <TextField 
                            onChange={formik.handleChange}
                            error={formik.touched.selling_price && Boolean(formik.errors.selling_price)}
                            helperText={formik.touched.selling_price && formik.errors.selling_price}
                            value={formik.values.selling_price} 
                            name="selling_price" type="number"
                            label="Selling Price" fullWidth/>
                            
                        </Box>
                      
                    </Grid>

                    <Grid xs={12} sm={4}  >
                        <Box width="100%" p={1} >
                            <TextField
                            onChange={formik.handleChange}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            value={formik.values.quantity} 
                            type="number"
                            name="quantity"
                            label="Quantity" fullWidth/>
                        </Box>
                      
                    </Grid>

                    <Grid xs={12} alignSelf="center" >
                        <Box width="100%"  p={1} >
                            <LoadingButton type="submit" loading={loading} variant="outlined" fullWidth >Create Item</LoadingButton>
                        </Box>
                      
                    </Grid>

                </Grid>

                </Box>
            </form>
           
            
      

    )
}