import React, { useContext, useState } from 'react'
import {  SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { Avatar, Box, LinearProgress, Paper, Typography } from '@mui/material';
import { CancelRounded, CheckCircleOutlineRounded, CheckOutlined, CloseOutlined } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { FetchContext } from '../../../context/FetchContext';
import AttendanceContext from '../../../context/teacher/AttendanceContext';
import { AuthContext } from '../../../context/AuthContext';

export default function Attendance(props) {

    const {attendance} = props
    const {is_present, id, student} = attendance
    const [present, setPresent] = useState(is_present)
    const {full_name, image} = student
    const {authAxios} = useContext(FetchContext)
    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(false) 
    const {setAuthState} = useContext(AuthContext)

    const {updateAttendanceData,
        attendances,
        allAttendances,
        setAttendances,
        setAllAttendances,
    } = useContext(AttendanceContext)


    const updateAttendance = (is_p) => {

            if (is_p === present)
              return

            setLoading(true)
        
            authAxios.put(`api/v1/attendances/${id}` , {attendance: {is_present: is_p}}).then((res) => {
              
                console.log(allAttendances)
                const {is_present, id} = res.data
                //setBehaviourReports(res.data)
                const newAttendances = allAttendances.map((attendance) => {
                  if (attendance.id === res.data.id){
                      const newAttendance = Object.assign({}, attendance)
                      newAttendance.is_present = res.data.is_present
                      
                 
                      return newAttendance
                  }
                  return attendance
                 
                })

               
                updateAttendanceData(newAttendances)
                setAttendances(newAttendances)
                setAllAttendances(newAttendances)
                setPresent(is_present)
                setLoading(false)
               
            }).catch((err) => {
                const {status} = err.response 
                if (status === 401){
                    setAuthState({})
                }
                console.log(err)
                setLoading(false)
                setFailed(true)
    
            })
    
    }


    return (
        <SwipeableListItem
        threshold={0.15}
        blockSwipe={loading}
        swipeLeft={{
            content: <Box borderRadius={1} height="75%" display="flex" justifyContent="center" alignItems="center" width="100%" color="success" sx={{bgcolor: red[400], color: "white"}}> <CancelRounded /> </Box>,
            action: () => updateAttendance(false)
        }}
        swipeRight={{
          content: <Box borderRadius={1} height="75%" display="flex" justifyContent="center" alignItems="center" width="100%" color="success" sx={{bgcolor: green[400], color: "white"}}> <CheckCircleOutlineRounded /> </Box>,
          action: () => updateAttendance(true)
        }}
        onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
      >
        <Box sx={{width: '100%', padding: "5px", borderRight: ""}} >
                <Paper elevation={3} sx={{borderRadius: "9px"}} >
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width: '100%', padding: "10px"}}  >
                       
                        
                        
                        <Box display="flex" alignItems="center" >
    
                          <Box display="flex" alignItems="center" >
                              <Avatar src={image} />
                                <Typography  sx={{ml: 2, textTransform: "capitalize"}}>{full_name}</Typography>
    
                          </Box>
    
                           
                        </Box>
    
                        <Box display="flex" alignItems="center" >
                            <Avatar variant="circular" sx={{ bgcolor: 'white', color: present ? green[400] : red[400] }}>
                                    
                                    {present ? <CheckOutlined /> : <CloseOutlined />}
                            </Avatar>
    
                          </Box>
    
                    </Box>
                    {
                      loading && <LinearProgress  color="warning" />
                    }
                    
    
                </Paper>
            </Box>
      </SwipeableListItem>
    )
}