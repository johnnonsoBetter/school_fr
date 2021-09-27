import { Container } from "@mui/material"
import React from 'react' 
import ParentDashboard from "./ParentDashboard"


function Homepage(){

    return (
       <Container maxWidth="lg">
           <ParentDashboard />
       </Container>
    )
}

export default Homepage