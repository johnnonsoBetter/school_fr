import React, { useContext, useEffect } from 'react'
import AdminContext from '../../../context/admin/AdminContext'
import { FetchContext } from '../../../context/FetchContext'

export default function Home(){

    const {authAxios} = useContext(FetchContext)
    const {dashboardInfo, setDashboardInfo} = useContext(AdminContext)


    useEffect(() => {

        authAxios.get('api/v1/admin_dashboards').then((res) => {

            console.log(res)
            const {classrooms, teachers, score_types, term_dates} = res.data

            const newDashboardInfo = Object.assign({}, dashboardInfo)
            newDashboardInfo.classrooms = classrooms
            newDashboardInfo.teachers = teachers
            newDashboardInfo.scoreTypes = score_types
            newDashboardInfo.termDates = term_dates

            setDashboardInfo(newDashboardInfo)
        }).catch((err) => {
            console.log(err)
        })
        
    }, [])


    return (
        <p> The home </p>
    )
}