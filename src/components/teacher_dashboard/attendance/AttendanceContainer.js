import { Avatar, Badge, Box, Grid, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { CancelRounded, CheckCircleOutlineRounded, CheckOutlined, CloseOutlined, PeopleAltRounded } from '@mui/icons-material';
import { blue, green, red } from '@mui/material/colors';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FetchContext } from '../../../context/FetchContext';
import { useParams } from 'react-router-dom';
import FailedFetch from '../../utilities/FailedFetch';
import Loader from '../../utilities/Loader';
import Empty from '../../utilities/Empty';
import Attendance from './Attendance';
import { AttendanceContextProvider } from '../../../context/teacher/AttendanceContext';
import GroupedStudentFilterInput from './GroupStudentFilterInput';
import TeacherContext from '../../../context/teacher/TeacherContext';
import { AuthContext } from '../../../context/AuthContext';


export default function AttendanceContainer () {
    const [value, setValue] = React.useState('Students');

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [attendances, setAttendances] = useState([])
    const [allAttendances, setAllAttendances] = useState([])
    const {authAxios} = useContext(FetchContext)
    const {classroom_id} = useParams()
    const {classroom} = useContext(TeacherContext).dashboardInfo 
    const [attendancesData, setAttendancesData] = useState({
        totalPresent: 0,
        totalAbsent: 0
    })
    const {setAuthState} = useContext(AuthContext)


    const updateAttendanceData = (atts) => {

        const newAttendanceData = Object.assign(attendancesData, {})
        const totalPresent = atts.filter(att => att.is_present === true).length
        const totalAbsent = atts.filter(att => att.is_present === false).length
        newAttendanceData.totalPresent = totalPresent
        newAttendanceData.totalAbsent = totalAbsent
        setAttendancesData(newAttendanceData)

    }

    useEffect(() => {
        authAxios.post('api/v1/multiple_attendance_creators', {classroom_id: classroom_id}).then((res) => {

            console.log(res)
            setAttendances(res.data)
            setAllAttendances(res.data)
            updateAttendanceData(res.data)
            setLoading(false)

        }).catch((err) => {
            const {status} = err.response 
            if (status === 401){
                setAuthState({})
            }
            setLoading(false)
            setFailed(true)

        })

        return () => {
            // setBehaviourReports([])
            setLoading(true)
            setFailed(false) 
            setAttendancesData({
                totalPresent: 0,
                totalAbsent: 0
            })
            setAllAttendances([])
            setAttendances([])
        }

        

    }, [])
    

  const handleChange = (event, newValue) => {
    setValue(newValue);

    
    if( newValue === "Present" ) {
        setAttendances(allAttendances.filter(at => at.is_present === true))
    }else if(newValue === "Absent"){
        setAttendances(allAttendances.filter(at => at.is_present === false))
    }else{
        setAttendances(allAttendances)
    }
    
  };

    return (
       <> 
       <AttendanceContextProvider 
    
            value={{
                updateAttendanceData,
                attendances,
                allAttendances,
                setAttendances: (att) => setAttendances(att),
                setAllAttendances: (att) => setAllAttendances(att)
            }}
        >

                <Box >

                {
                    loading ? 
                    <Loader /> :
                    failed ?
                    <FailedFetch message="Failed To Load Behaviour Reports" height="calc(90vh - 200px)"/> : 
                    <>  

                   
                    <Box m={1} > <Typography variant="h6" sx={{textTransform: "capitalize"}} fontWeight={800} >  {classroom} Attendance </Typography></Box>
                    <Box m={1}  sx={{display: {xs: 'block', sm: 'flex'}, justifyContent: {sm: 'space-between', md: 'flex-end'}}}  justifyContent="flex-end" >

                    <GroupedStudentFilterInput allAttendances={allAttendances} setAttendances={setAttendances} />
                    
                    <BottomNavigation sx={{display: {xs: 'none', sm: 'block'}}}   value={value} onChange={handleChange}>
                    <BottomNavigationAction  label="Absent" value="Absent"  
                            icon={
                                <Badge color="warning" badgeContent={attendancesData.totalAbsent} sx={{fontWeight: 800}} showZero >
                                <PeopleAltRounded sx={{ bgcolor: 'white', color: red[400] }} />
                                </Badge>
                            } 
                    />
                    <BottomNavigationAction  label="Students" value="Students"  
                    
                    icon={
                        
                        <PeopleAltRounded sx={{ bgcolor: 'white', color: blue[400] }} />
                    
                    } />
                    
                    <BottomNavigationAction  label="Present" value="Present"  
                        
                        icon={
                            <Badge color="warning" badgeContent={attendancesData.totalPresent} sx={{fontWeight: 800}} showZero >
                            <PeopleAltRounded sx={{ bgcolor: 'white', color: green[400] }} />
                            </Badge>
                        } />
                    
                    </BottomNavigation>

                    </Box>
                    

                    {attendances.length === 0 && <Empty message={`No ${value} Students`} height="calc(90vh - 200px)"/>}
                    <SwipeableList
                        scrollStartThreshold={attendances.length}
                    >

                        <Grid container >

                            {

                                
                                attendances.map((att) => {

                                    return (
                                        <Grid key={att.id} item xs={12} sm={6} >
                                            <Attendance attendance={att}  />
                                        </Grid>
                                    )
                                })
                            }
                                
                        </Grid>

                    </SwipeableList>
                    

                    
                    </> 
                }

                </Box>







   


    <Paper sx={{ display: {xs: 'block', sm: 'none'}, backgroundColor: "rgb(233 243 255 / 20%)", backdropFilter: "blur(2px)", zIndex: (theme) => theme.zIndex.drawer + 1, position: 'fixed', color: "green", bottom: 0, left: 0, right: 0  }}  elevation={3}>

        <BottomNavigation   value={value} onChange={handleChange}>
        <BottomNavigationAction  label="Absent" value="Absent"  
                icon={
                    <Badge color="warning" badgeContent={attendancesData.totalAbsent} sx={{fontWeight: 800}} showZero >
                    <PeopleAltRounded sx={{ bgcolor: 'white', color: red[400] }} />
                    </Badge>
                } 
        />
        <BottomNavigationAction  label="Students" value="Students"  
        
        icon={
            
            <PeopleAltRounded sx={{ bgcolor: 'white', color: blue[400] }} />
           
        } />
        
        <BottomNavigationAction  label="Present" value="Present"  
            
            icon={
                <Badge color="warning" badgeContent={attendancesData.totalPresent} sx={{fontWeight: 800}} showZero >
                <PeopleAltRounded sx={{ bgcolor: 'white', color: green[400] }} />
                </Badge>
            } />
        
        </BottomNavigation>


            </Paper>
        </AttendanceContextProvider>     
    </>

    )
} 