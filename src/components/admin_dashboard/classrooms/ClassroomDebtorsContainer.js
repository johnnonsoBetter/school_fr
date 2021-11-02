import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import Debtor from './Debtor'

import GroupedStudentFilterInput from './GroupStudentFilterInput'


export default function ClassroomDebtorsContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [debtors, setDebtors] = useState([])
    const [allDebtors, setAllDebtors] = useState([])
    const {id} = useParams()

    useEffect(() => {

        authAxios.get('api/v1/debtors', {params: {classroom_id: id}}).then((res) => {
            console.log(res)
            setLoading(false)
            setDebtors(res.data)
            setAllDebtors(res.data)
        }).catch(err => {
            
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setDebtors([])
            setAllDebtors([])
        }
    }, [])

    return (
        <>
        {/* <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Debtors</Typography>

            {
                allDebtors !== 0 && <GroupedStudentFilterInput setDebtors={setDebtors} allDebtors={allDebtors} />
            }
            
        </Box> */}
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Debtors" height="calc(90vh - 200px)"/> : 
            <>  
            {
            debtors.length === 0 ? 
            <Empty message="No Debtors Found" height="calc(90vh - 200px)"/> :
            <Box sx={{maxHeight: "calc(95vh - 165px)", overflow: "auto"}} >

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