

import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { FetchProvider } from '../../context/FetchContext'
import Login from './Login'

import AdminDashboard from './AdminDashboard'

export default function AdminView(){

    const {isAuthenticated} = useContext(AuthContext)

    return (
            <FetchProvider> 
              

                    <Route   path="/login" render={()=> ( <Login />) } />
                    <Route   path="/" render={()=>
                        isAuthenticated() ? ( <AdminDashboard />) : <Redirect to="/login" />
                    
                    } />

            
            </FetchProvider>
       
    )
}