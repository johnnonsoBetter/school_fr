import { Box, IconButton, InputBase, TextField, Typography } from '@mui/material'
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
  


export default function ItemSaler(props) {

    const {authAxios} = useContext(FetchContext)
    const {items, allItems, setItems, setAllItems} = useContext(ItemContext)
    const [loading, setLoading] = useState(false)
    const {closeAll, id, selling_price, quantity} = props
    const {snackInfo, setOpenSnack, setSnackInfo} = useContext(AdminContext)
    const {setAuthState} = useContext(AuthContext)

    const validationSchema = yup.object({
        quantity: yup
            .number().required().positive().lessThan(quantity + 1),
        
    });
    
    const formik = useFormik({

        initialValues: {
          quantity: 1,
          total: selling_price * 1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)

            console.log(values)

            const items_sold = [{item_id: id, quantity: values.quantity}]

            console.log(items_sold)


            
            authAxios.post('api/v1/sale_reports', {sale_report: {total: (values.quantity * selling_price)}, items_sold: items_sold}).then((res) => {
                
               console.log(res)
            
                formik.resetForm()
                const newItems = items.map((item) => {
                    if (item.id === id){
                        const newItem = Object.assign({}, item)
                        newItem.quantity -= items_sold[0].quantity

                        console.log(newItem)
                        return newItem
                    }
                    return item
                   
                })

                setItems(newItems)
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Transaction Successful`
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
                newSnackBarInfo.message = `Transaction Failed`
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
                        <TextField type="number" name="quantity"  size="small" sx={{width: "60px"}}
                            value={formik.values.quantity}
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                            onChange={formik.handleChange}
                        />

                        <Box textAlign="center" sx={{ml: 2}} >
                            <Typography variant="body2"> Total</Typography>
                            <Typography variant="body2"> {selling_price * formik.values.quantity}</Typography>
                        </Box>
                        <LoadingButton loading={loading} type="submit" sx={{ml: 3}}  >Sale </LoadingButton>
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