import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import Debtor from './Debtor'


export default function DebtorContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [debtors, setDebtors] = useState([])

    useEffect(() => {

        authAxios.get('api/v1/debtors').then((res) => {
            console.log(res)
            setLoading(false)
            setDebtors(res.data)
        }).catch(err => {
            
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setDebtors([])
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Debtors</Typography>
           
        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Behaviour Reports" height="calc(90vh - 200px)"/> : 
            <>  
            {
            debtors.length === 0 ? 
            <Empty message="No Debtors Found" height="calc(90vh - 200px)"/> :
            <Box >

                <Grid container >
                    

                    {
                        debtors.map((debtor) => {

                            return (
                                <Grid key={debtor.id} item xs={12} sm={6} md={4} >
                                    <Debtor debtor={debtor} />            
                                </Grid>
                            )
                        })
                    }
                </Grid>
                


            </Box>
            
            }

            </> 
        }

         </Box>
    </>
    )
}