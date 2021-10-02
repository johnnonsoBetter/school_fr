import { Backdrop, CircularProgress, Container} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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
    const history = useHistory()
    const {isAuthenticated, authState} = useContext(AuthContext)

    
  

    useEffect(() => {
        
        authAxios.get('api/v1/guidance_dashboards').then((res) => {
            const children = res.data
    
            setChildren(children)
            setStudentId(children[0].id)
            setLoading(false)
            console.log("children" , children)

        }).catch(err => {
            setLoading(false)
        })
 
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
                        setLoading: (loading) => setLoading(loading)
                    }}
                >
                    {
                        loading ?
                        <Backdrop
                            sx={{ backgroundColor: "rgba(32, 38, 45, 0.2)", backdropFilter: "blur(2px)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                           
                     >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        :
                        <Container maxWidth="lg">
                            <Header />         
                            <Section />
                        </Container> 
                    }

                    
                </ParentContextProvider>
           

            
            </>
       
    )
}


export default ParentDashboard