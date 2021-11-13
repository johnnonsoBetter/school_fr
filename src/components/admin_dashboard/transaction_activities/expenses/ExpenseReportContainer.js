import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { Box, Chip } from '@mui/material'
import Empty from '../../../utilities/Empty'
import FailedFetch from '../../../utilities/FailedFetch'
import Loader from '../../../utilities/Loader'
import { FetchContext } from '../../../../context/FetchContext'
import TransactionContext from '../../../../context/admin/TransactionContext'
import ExpenseReportTable from './ExpenseReportTable'
import AmountFormater from '../../../utilities/AmountFormatter'
import { AuthContext } from '../../../../context/AuthContext'



export default function ExpenseReportContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [expenses, setExpenses] = useState([])
    const {filterType, filterInfo} = useContext(TransactionContext)
    const [total, setTotal] = useState(0)
    
    const numbers = expenses.map((expense => expense.amount));
    const sum = numbers.reduce(function(sum, number) {
    const updatedSum = sum + number;
    return updatedSum;
    }, 0);
    const {setAuthState} = useContext(AuthContext)
    
  
    const expenseReportParam = () => {

        if (filterType === 'date'){
            return {date: filterInfo.date}
        }else if(filterType === 'term_date'){
            return {term_id: filterInfo.term_id}
        }else if(filterType === 'date_range'){
            return {from: filterInfo.from, to: filterInfo.to}
        }

        return {}
    }


    useEffect(() => {
        setLoading(true)
        authAxios.get('api/v1/expense_reports',
            {params: expenseReportParam()}
        ).then((res) => {
            console.log(res)
            setLoading(false)
            setExpenses(res.data)
            
            
            
        }).catch(err => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setFailed(true)
            setLoading(false)
          
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setExpenses([])
            setTotal(0)
      
        }
    }, [filterInfo, filterType])

    return (
        <>
          
            <Box p={1} justifyContent="space-between" sx={{display: { sm: 'flex' }}} alignExpenses="center" >

                <Box display="flex"  >
                    <Typography sx={{fontWeight: "bolder"}} >Total: ₦{AmountFormater(sum).amount()} </Typography>
                </Box>

           
            
            </Box>

            <Box >

                {
                    loading ? 
                    <Loader /> :
                    failed ?
                    <FailedFetch message="Failed To Load Expenses" height="calc(90vh - 200px)"/> : 
                    <>  
                        {
                            expenses.length === 0 ? 
                            <Empty message="No Expenses Found" height="calc(90vh - 200px)"/> :
                            
                            <ExpenseReportTable expenses={expenses} />

                        }

                    </> 
                }

            </Box>
          
        </>
    )
}