import React from 'react'
import { AuthProvider } from '../../context/AuthContext'


import TeacherView from './TeacherView'

export default function TeacherApp(){


    return (
        <>
        <AuthProvider>
            <TeacherView />
        </AuthProvider>
        </>
    )
}