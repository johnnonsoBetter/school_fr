import { SpellcheckRounded } from '@mui/icons-material'
import { Box, Button, Hidden, IconButton, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import TeacherContext from '../../context/teacher/TeacherContext'
import Profile from './Profile'

export default function HeaderToolBar({handleDrawerToggle}){
    const {handleClickOpen} = useContext(TeacherContext)
    return (
        <>
            <Toolbar sx={{backgroundColor: "white"}} >
                <Box display="flex" width="100%" justifyContent="space-between" >
                <Box sx={{display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}} ml={10}><img src="/images/logo.png" alt="logo" /></Box>


                    <IconButton
                        color="success"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { lg: 'none' } }}
                    >
                        <img src="/images/menu.png" width="24px" />
                    </IconButton>

                    <Box width="100%" display="flex" justifyContent="flex-end">
                    
                        <Hidden smDown >
                            <Button onClick={handleClickOpen} endIcon={<SpellcheckRounded />} sx={{marginRight: "20px", fontWeight: "bolder", backgroundColor: "#00A6FF", color: "white"}}>Create Draft</Button>
                        </Hidden>
                        <Hidden smUp >
                            <IconButton onClick={handleClickOpen} sx={{marginRight: "20px", color: "#00A6FF"}} >
                                <SpellcheckRounded />
                            </IconButton>
                        </Hidden>
                        <Profile />
                    </Box>

                
                </Box>
          
            </Toolbar>
        </>
    )
}