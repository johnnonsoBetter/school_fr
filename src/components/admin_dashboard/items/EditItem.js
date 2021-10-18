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

const validationSchema = yup.object({
    name: yup
        .string().required(),
    selling_price: yup
    .number().required().positive()
});


export default function EditItem(props) {

    const {authAxios} = useContext(FetchContext)
    const {items, allItems,  setItems, setAllItems} = useContext(ItemContext)
    const [loading, setLoading] = useState(false)
    const {closeAll, id, name, selling_price} = props
    const {snackInfo, setOpenSnack, setSnackInfo} = useContext(AdminContext)


    const formik = useFormik({

        initialValues: {
          name,
          selling_price,
          id,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)

            console.log(values)
            
            authAxios.put(`api/v1/items/${id}`, {item: values}).then((res) => {
                
                console.log(res)
               
            
                formik.resetForm()
                const newItems = allItems.map((item) => {
                    if (item.id === id){
                        const newItem = Object.assign({}, item)
                        newItem.name = res.data.name
                        newItem.selling_price = res.data.selling_price
                        newItem.quantity = res.data.quantity

                   
                        return newItem
                    }
                    return item
                   
                })

                setItems(newItems)
                setAllItems(newItems)
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Item Succesfully Update`
                newSnackBarInfo.severity = 'success'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
                closeAll()
    
            }).catch((err) => {
                const newSnackBarInfo = Object.assign(snackInfo, {})
                newSnackBarInfo.message = `Item Failed to Updated`
                newSnackBarInfo.severity = 'warning'
                setSnackInfo(newSnackBarInfo)
                setOpenSnack(true)
                setLoading(false)
            })
        },
    }); 

    return (
            <Box  >

                <Box display="flex" justifyContent="flex-end" p={1} >

                    <IconButton  onClick={() => closeAll()} >
                        <CancelRounded />
                    </IconButton>

                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" justifyContent="center" alignItems="center" >
                            <TextField  name="name"  size="small"
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                onChange={formik.handleChange}
                                
                            />

                        
                        
                    </Box>

                    <Box display="flex" p={1} justifyContent="center" alignItems="center" >
                            <TextField  name="selling_price"  size="small" type="number"
                                value={formik.values.selling_price}
                                error={formik.touched.selling_price && Boolean(formik.errors.selling_price)}
                                helperText={formik.touched.selling_price && formik.errors.selling_price}
                                onChange={formik.handleChange}
                                
                            />

                        
                        
                    </Box>
 
                    <Box display="flex" justifyContent="center" alignItems="center" p={2} >
                        <LoadingButton loading={loading} type="submit"  variant="outlined" >Update </LoadingButton>

                    </Box>

                    
                </form>


            </Box>
            
        
    )
}