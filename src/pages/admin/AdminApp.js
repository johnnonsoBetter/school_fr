import React from 'react'
import { AuthProvider } from '../../context/AuthContext'


import AdminView from './AdminView'

export default function AdminApp(){

    
    return (
        <>
        <AuthProvider>
            <AdminView />
        </AuthProvider>
        </>
    )
}