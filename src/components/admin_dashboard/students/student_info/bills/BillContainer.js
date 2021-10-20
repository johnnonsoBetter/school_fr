import { Box, Grid, List, ListSubheader } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import { FetchContext } from '../../../../../context/FetchContext'
import Bill from './Bill'
import Empty from '../../../../utilities/Empty'
import FailedFetch from '../../../../utilities/FailedFetch'
import Loader from '../../../../utilities/Loader'



 

export default function BillContainer(){

     
  
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [bills, setBills] = useState([])
    const {authAxios} = useContext(FetchContext)
    const {id} = useParams()

    useEffect(() => {

       authAxios.get('api/v1/admin_student_bills/', {params: {student_id: id}})
       
       .then((res) => {

            console.log(res)
            setBills(res.data)
            setLoading(false)
            

       }).catch(err => {
           console.log(err)
           setLoading(false)
           setFailed(true)
       })
 

    }, [])

   


    return (
       <>
           
         <Box display="flex" justifyContent="flex-end" flexGrow={1} p={1}>
         
         
         </Box>
         {
                
                loading ? <Loader /> :
                failed ? <FailedFetch message="Something Went Wrong" height="calc(90vh - 200px)" />  :

            <>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}  >
                
            </Box> 
               {
                    bills.length === 0 ?
                    <Empty message="No Bills Report Found" height="calc(90vh - 200px)" /> :
                    <Grid container>

                        {
                             bills.map(bill => {

                                return (
                                    <Grid key={bill.id} item xs={12} sm={6} zeroMinWidth >
                                        <Bill bill={bill} />
                                    </Grid>
                                )
                            })

                        }
                        


                    </Grid>

                     
               }

            </>

            }

       </>
    )
}