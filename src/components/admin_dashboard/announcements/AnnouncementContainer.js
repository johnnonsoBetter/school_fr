

import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import Announcement from './Announcement'
import AnnouncementList from './AnnouncementList'



export default function AnnouncementContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [announcements, setAnnouncements] = useState([])
    const [slides, setSlides] = useState([])
    

    useEffect(() => {

        authAxios.get('api/v1/announcements').then((res) => {
            console.log(res)
            setLoading(false)
            setAnnouncements(res.data)

            setSlides(res.data.map((ann) => ( <Announcement announcements={announcements} setAnnouncements={setAnnouncements} key={ann.id} announcement={ann}/>)))
          
        }).catch(err => {
            
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setAnnouncements([])
            setSlides([])
          
        }
    }, [])

    return (
        <>
        <Box p={1} sx={{display: { sm: 'flex' }}} alignItems="center" justifyContent="space-between">
            <Typography sx={{mb: { xs: '10px' }, fontWeight: "bolder"}} variant="h4">Announcements</Typography>

        </Box>
        <Box >

        {
            loading ? 
            <Loader /> :
            failed ?
            <FailedFetch message="Failed To Load Announcements" height="calc(90vh - 200px)"/> : 
            <>  
                <AnnouncementList slides={slides} />
            </> 
        }

         </Box>
    </>
    )
}