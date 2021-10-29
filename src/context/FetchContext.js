import axios from 'axios'
import React, { createContext } from 'react'
const FetchContext = createContext()

const {Provider} = FetchContext

const FetchProvider = ({children}) => {
    
    const authAxios = axios.create({
        baseURL: process.env.NODE_ENV === 'development'? 'http://localhost:3001' : 'https://confamsch-b.herokuapp.com/'
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