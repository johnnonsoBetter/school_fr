import React from 'react'
import { AuthProvider } from '../../context/AuthContext'
import ParentView from './ParentView'

export default function ParentApp(){


    return (
        <>
        <AuthProvider>
            <ParentView />
        </AuthProvider>
        </>
    )
}