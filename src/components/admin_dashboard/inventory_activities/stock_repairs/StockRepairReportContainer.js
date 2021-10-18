import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { Box, Chip } from '@mui/material'
import Empty from '../../../utilities/Empty'
import FailedFetch from '../../../utilities/FailedFetch'
import Loader from '../../../utilities/Loader'
import { FetchContext } from '../../../../context/FetchContext'
import InventoryContext from '../../../../context/admin/InventoryContext'
import StockRepairReportTable from './StockRepairReportTable'
import AmountFormater from '../../../utilities/AmountFormatter'



export default function StockRepairReportContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [stockRepairs, setStockRepairs] = useState([])
    const {filterType, filterInfo} = useContext(InventoryContext)
    const [total, setTotal] = useState(0)
    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    // const {date, term_id, }


    
  
    const stockRepairReportParam = () => {

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
        
        authAxios.get('api/v1/stock_repair_reports',
            {params: stockRepairReportParam()}
        ).then((res) => {
            console.log(res)
            setLoading(false)
            setStockRepairs(res.data)
            
        }).catch(err => {
            setFailed(true)
            setLoading(false)
            setTotal(0)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setStockRepairs([])
      
        }
    }, [])

    useEffect(() => {
        
        authAxios.get('api/v1/stock_repair_reports',
            {params: stockRepairReportParam()}
        ).then((res) => {
            console.log(res)
            setLoading(false)
            setStockRepairs(res.data)
            
            
            
        }).catch(err => {
            setFailed(true)
            setLoading(false)
            setTotal(0)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setStockRepairs([])
            setTotal(0)
      
        }
    }, [filterInfo, filterType])

    return (
        <>
          
            <Box p={1} justifyContent="space-between" sx={{display: { sm: 'flex' }}} alignStockRepairs="center" >

              
            </Box>

            <Box >

                {
                    loading ? 
                    <Loader /> :
                    failed ?
                    <FailedFetch message="Failed To Load StockRepairs" height="calc(90vh - 200px)"/> : 
                    <>  
                        {
                            stockRepairs.length === 0 ? 
                            <Empty message="No StockRepairs Found" height="calc(90vh - 200px)"/> :
                             <StockRepairReportTable stockRepairs={stockRepairs} />
                           

                        }

                    </> 
                }

            </Box>
          
        </>
    )
}