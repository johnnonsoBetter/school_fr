import { Box, IconButton, InputBase, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import ItemContext from '../../../context/admin/ItemContext'
import { FetchContext } from '../../../context/FetchContext'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { styled, withStyles } from '@mui/styles';
import { CancelRounded } from '@mui/icons-material';
import AdminContext from '../../../context/admin/AdminContext';
import { AuthContext } from '../../../context/AuthContext';

const validationSchema = yup.object({
    quantity: yup
        .number().required().positive()
});


const Input = styled(InputBase)(({ theme }) => ({
    
    'label + &': {
        marginTop: theme.spacing(3),
        paddingLeft: "2px"
      },
    
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '80px',
      
    }
}));
  


export default function ItemRestocker(props) {

    const {authAxios} = useContext(FetchContext)
    const {items, allItems, setItems, setAllItems} = useContext(ItemContext)
    const [loading, setLoading] = useState(false)
    const {closeAll, id} = props
    const {snackInfo, setOpenSnack, setSnackInfo} = useContext(AdminContext)
    const {setAuthState} = useContext(AuthContext)


    const formik = useFormik({

        initialValues: {
          quantity: 0,
          item_id: id
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)

            console.log(values)
            
            authAxios.post('api/v1/restock_reports', {restock_report: values}).then((res) => {
                
               
            
                formik.resetForm()
                const newItems = items.map((item) => {
                    if (item.id === id){
                        const newItem = Object.assign({}, item)
                        newItem.quantity += res.data.quantity

                        console.log(newItem)
                        return newItem
                    }
                    return item
                   
                })

                setItems(newItems)
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Succesfully Restocked`
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
                newSnackBarInfo.message = `Failed to Restocked`
                newSnackBarInfo.severity = 'warning'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
            })
        },
    }); 

    return (
        
            <form onSubmit={formik.handleSubmit}>
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Box pl={2} pb={2} pr={2} display="flex" justifyContent="flex-start" >
                        <TextField type="number" name="quantity"  size="small"
                            value={formik.values.quantity}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            onChange={formik.handleChange}
                        />
                        <LoadingButton loading={loading} type="submit" sx={{ml: 3}} color="secondary" >Add </LoadingButton>
                    </Box>

                    <Box pl={2} pb={2} pr={2} >

                        <IconButton  onClick={() => closeAll()} >
                            <CancelRounded />
                        </IconButton>

                    </Box>
                </Box>
            </form>
        
    )
}