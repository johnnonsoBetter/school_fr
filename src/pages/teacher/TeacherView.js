

import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { FetchProvider } from '../../context/FetchContext'
import Login from './Login'

import TeacherDashboard from './TeacherDashboard'

export default function TeacherView(){

    const {isAuthenticated} = useContext(AuthContext)

    return (
            <FetchProvider> 
              

                    <Route   path="/login" render={()=> ( <Login />) } />
                    <Route   path="/" render={()=>
                        isAuthenticated() ? ( <TeacherDashboard />) : <Redirect to="/login" />
                    
                    } />

            
            </FetchProvider>
       
    )
}