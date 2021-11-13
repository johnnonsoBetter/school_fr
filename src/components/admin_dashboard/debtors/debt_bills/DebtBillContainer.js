import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import { FetchContext } from '../../../../context/FetchContext'
import Empty from '../../../utilities/Empty'
import FailedFetch from '../../../utilities/FailedFetch'
import Loader from '../../../utilities/Loader'
import Bill from '../../bills/Bill'



export default function DebtBillContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [bills, setBills] = useState([])
    const {id} = useParams()
    const {setAuthState} = useContext(AuthContext)


    useEffect(() => {
        
        authAxios.get('api/v1/debt_bills', {params: {student_id: id}}).then((res) => {
            console.log(res)
            setLoading(false)
            setBills(res.data)
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
            setBills([])
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Bills</Typography>
           
        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Bills" height="calc(90vh - 200px)"/> : 
            <>  
            {
            bills.length === 0 ? 
            <Empty message="No Bills Found" height="calc(90vh - 200px)"/> :
            <Box > 

                <Grid container >
                    

                    {
                        bills.map((bill) => {

                            return (
                                <Grid key={bill.id} item xs={12}  >
                                    <Bill bill={bill}  />
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