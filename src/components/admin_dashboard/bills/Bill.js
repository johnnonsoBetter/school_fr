import { CancelRounded, HistoryEduRounded, HistoryOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Chip, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import AmountFormater from '../../utilities/AmountFormatter'
import BillDetail from './BillDetail'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FetchContext } from '../../../context/FetchContext'
import { LoadingButton } from '@mui/lab'
import { Redirect } from 'react-router-dom'


export default function Bill(props){

    const [open, setOpen] = useState(false)
    const {bill} = props
    const {bill_report} = bill
    const [loading, setLoading] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [redirectOnLogin, setRedirectOnLogin] = useState(false)
    

    const validationSchema = yup.object({
        amount: yup.number().required().moreThan(10).lessThan(bill.balance + 1)
    
    });

    const formik = useFormik({
        initialValues: {
        amount: '0'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)

            console.log(values)
            
            
            
            authAxios.post(`api/v1/debt_recovered_reports/`, {debt_recovered_report: {amount: values.amount, bill_id: bill.id}} ).then((res) => {
                
                console.log(res)
                setRedirectOnLogin(true)
                

            }).catch((err) => {
                console.log(err)
                
                setLoading(false)
            })
        
        },
    }); 


    return (
        <>
        {
        <>
        {redirectOnLogin ? <Redirect to="/debtors" /> :
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                   
                    <Typography sx={{fontWeight: "bold", color: "GrayText", textTransform: "capitalize"}}> {bill_report.title} </Typography>
                    <Box display="flex" alignItems="center" >
                        <Chip sx={{mr: 2}} avatar={<Avatar>B</Avatar>} label={AmountFormater(bill.balance).amount()} />
                        {
                            open ?
                            
                            <>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField sx={{width: "100px", mr: 2}} size="small" 
                                        name="amount"
                                        onChange={formik.handleChange}
                                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                                        helperText={formik.touched.amount && formik.errors.amount}
                                        value={formik.values.amount} 
                                    />
                                    <LoadingButton loading={loading} variant="outlined" type="submit" sx={{mr: 1}}  >Recover</LoadingButton>
                                </form>
                               
                                <IconButton  onClick={() => setOpen(false)}>
                                    <CancelRounded />
                                </IconButton>

                            </>
                            :
                            <>
                                <BillDetail bill={bill} billReport={bill_report} paymentHistories={bill.payment_histories} />
                                <IconButton onClick={() => setOpen(true)}>
                                    <HistoryEduRounded />
                                </IconButton>




                            </>
                            

                        }
                        
                        
                   
                    </Box>
                    
                </Box>

            </Paper>
        </Box>}
        </>
            }
        </>
        
    )
}