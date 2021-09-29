import axios from 'axios'
import React, { createContext, useContext } from 'react'
import { AuthContext } from './AuthContext'


const FetchContext = createContext()

const {Provider} = FetchContext

const FetchProvider = ({children}) => {
    const {authState} = useContext(AuthContext)

    const authAxios = axios.create({
        baseURL: 'http://localhost:3001/' 
    })

    authAxios.interceptors.request.use(
        config => {
    
        const userHeaders =  JSON.stringify(

            {   
                'access-token': `${localStorage.getItem('token')}`,
                'client': `${localStorage.getItem('client')}`,
                'uid': `${localStorage.getItem('uid')}`
            
            }
          )

       
          config.headers = JSON.parse(userHeaders)
          return config;
        },
        error => {
          return Promise.reject(error);
        }
    ); 
    
    return (
        <Provider 
            value={{
                authAxios
            }}

        >
            {children}
        </Provider>
    )

}

export {FetchContext, FetchProvider}