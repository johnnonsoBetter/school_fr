import { Backdrop, CircularProgress, Container} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Route, useHistory, Switch } from 'react-router-dom'
import AnnouncementContainer from '../../components/parent_dashboard/announcements/AnnouncementContainer'

import Header from '../../components/parent_dashboard/header/Header'
import Section from '../../components/parent_dashboard/header/Section'
import { AuthContext } from '../../context/AuthContext'

import { FetchContext } from '../../context/FetchContext'
import ParentContextProvider from '../../context/parent/ParentContext'


function ParentDashboard(){
    const {authAxios} = useContext(FetchContext)
    const [children, setChildren] = useState([])
    const [student_id, setStudentId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [dashboardInfo, setDashboardInfo] = useState({
        termDates: [],
        students: [],
        announcements: [],
        
      })

    
  

    useEffect(() => {
        
        authAxios.get('api/v1/guidance_dashboards').then((res) => {
            const {students, announcements, term_dates} = res.data
            
    
            setChildren(students)
            const newDashboardInfo = Object.assign({}, dashboardInfo)
            newDashboardInfo.announcements = announcements
            newDashboardInfo.students = students
            newDashboardInfo.termDates = term_dates


            setStudentId(students[0].id)
            setDashboardInfo(newDashboardInfo)
            setLoading(false)
          

        }).catch(err => {
            setLoading(false)
        })

        window.document.title = "Parent"


        return () => {
            setDashboardInfo({})
            setLoading(false)
            
        }

 
    }, [])

    return (
            <>
                <ParentContextProvider
                    value={{
                        children,
                        student_id,
                        setStudentId: (id) => setStudentId(id),
                        student: () => children.find(child => child.id === student_id),
                        loading,
                        setLoading: (loading) => setLoading(loading),
                        dashboardInfo,
                        setDashboardInfo,
                    }}
                >
                    {
                        loading ?
                        <Backdrop
                        sx={{ backgroundColor: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                        
                        >
                        
                        <div class="loadingio-spinner-wedges-ms9m8n0rjb9"><div class="ldio-cmgfr111trf">
                        <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
                        </div></div>
                    
                        </Backdrop>
                        :
                        <Container maxWidth="lg">
                            <Header />  

                            <Switch >

                            <Route path="/dashboard" >    
                                <Section />
                            
                            </Route>  

                            <Route path="/" >    
                                <AnnouncementContainer />
                            
                            </Route> 
                                
                                
                            </Switch>  

                                
                            
                        </Container> 
                    }

                    
                </ParentContextProvider>
           

            
            </>
       
    )
}


export default ParentDashboard