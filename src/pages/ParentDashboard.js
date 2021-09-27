import { Container } from '@mui/material'
import React from 'react'
import Header from '../components/parent_dashboard/header/Header'
import Section from '../components/parent_dashboard/header/Section'


function ParentDashboard(){


    return (
        <Container maxWidth="md">
            <Header />
         
            <Section />


        </Container> 
    )
}


export default ParentDashboard