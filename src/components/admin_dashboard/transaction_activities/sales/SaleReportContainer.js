import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { Box, Chip } from '@mui/material'
import Empty from '../../../utilities/Empty'
import FailedFetch from '../../../utilities/FailedFetch'
import Loader from '../../../utilities/Loader'
import { FetchContext } from '../../../../context/FetchContext'
import TransactionContext from '../../../../context/admin/TransactionContext'
import SaleReportTable from './SaleReportTable'
import AmountFormater from '../../../utilities/AmountFormatter'



export default function SaleReportContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [sales, setSales] = useState([])
    const {filterType, filterInfo} = useContext(TransactionContext)
    const [total, setTotal] = useState(0)
    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    // const {date, term_id, }


    
  
    const saleReportParam = () => {

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
        
        authAxios.get('api/v1/sale_reports',
            {params: saleReportParam()}
        ).then((res) => {
            console.log(res)
            setLoading(false)
            setSales(res.data)
            
        }).catch(err => {
            setFailed(true)
            setLoading(false)
            setTotal(0)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setSales([])
      
        }
    }, [])

    useEffect(() => {
        
        authAxios.get('api/v1/sale_reports',
            {params: saleReportParam()}
        ).then((res) => {
            console.log(res)
            setLoading(false)
            setSales(res.data)
            
            
            
        }).catch(err => {
            setFailed(true)
            setLoading(false)
            setTotal(0)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setSales([])
            setTotal(0)
      
        }
    }, [filterInfo, filterType])

    return (
        <>
          
            <Box p={1} justifyContent="space-between" sx={{display: { sm: 'flex' }}} alignSales="center" >

                <Box display="flex"  >
                    <Typography sx={{fontWeight: "bolder"}} >Total: {AmountFormater(total).amount()} </Typography>
                </Box>

           
            
            </Box>

            <Box >

                {
                    loading ? 
                    <Loader /> :
                    failed ?
                    <FailedFetch message="Failed To Load Sales" height="calc(90vh - 200px)"/> : 
                    <>  
                        {
                            sales.length === 0 ? 
                            <Empty message="No Sales Found" height="calc(90vh - 200px)"/> :
                            <SaleReportTable sales={sales} />

                        }

                    </> 
                }

            </Box>
          
        </>
    )
}