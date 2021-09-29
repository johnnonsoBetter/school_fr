import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FetchProvider } from '../../context/FetchContext'
import Login from './Login'
import ParentDashboard from './ParentDashboard'

export default function ParentView(){

    const {isAuthenticated} = useContext(AuthContext)
    

    console.log(isAuthenticated())
 

    return (
            <FetchProvider> 
                <Switch >
                        <Route  exact path="/login" render={()=> 
                            
                            isAuthenticated() ?  ( <Redirect to="/dashboard" />)   : ( <Login />)   
                            
                        } />
                        <Route   path="/dashboard" render={()=>
                            isAuthenticated() ?  ( <ParentDashboard />) :
                            ( <Redirect to="/login" />)
                        
                        } />

                </Switch>
            </FetchProvider>
       
    )
}