

import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
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
    const {setAuthState} = useContext(AuthContext)

    useEffect(() => {

        authAxios.get('api/v1/guidance_dashboards').then((res) => {
            const {announcements, students} = res.data
            
            setLoading(false)
            setAnnouncements(announcements)

            setSlides(announcements.map((ann) => ( <Announcement announcements={announcements} setAnnouncements={setAnnouncements} key={ann.id} announcement={ann}/>)))
          
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
            setAnnouncements([])
            setSlides([])
          
        }
    }, [])

    return (
        <>
        
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