import { Container} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from '../../components/parent_dashboard/header/Header'
import Section from '../../components/parent_dashboard/header/Section'
import { AuthContext } from '../../context/AuthContext'
import { FetchContext } from '../../context/FetchContext'
import ParentContextProvider from '../../context/parent/ParentContext'


function ParentDashboard(){
    const {authAxios} = useContext(FetchContext)
    const [children, setChildren] = useState([])
    const [student_id, setStudentId] = useState(null)

    
  

    useEffect(() => {

        authAxios.get('api/v1/guidance_dashboards').then((res) => {

            console.log(res)
            const children = res.data

            setChildren(children)
            setStudentId(children[0].id)

        }).catch(err => {
            console.log(err)
        })
        console.log("hey")

    }, [])

    return (
            <>

                <ParentContextProvider
                    value={{
                        children,
                        student_id,
                        setStudentId: (id) => setStudentId(id)
                    }}
                >


                    <Container maxWidth="lg">
                        <Header />         
                        <Section />
                    </Container> 


                </ParentContextProvider>
           

            
            </>
       
    )
}


export default ParentDashboard