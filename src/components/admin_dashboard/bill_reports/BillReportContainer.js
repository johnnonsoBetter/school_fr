import { Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'

export default function BillReportContainer(){
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)


    useEffect(() => {

        return () => {
            setLoading(true)
            setFailed(false)
        }
    })

    return (
        <Typography> Bill Report</Typography>
    )
}