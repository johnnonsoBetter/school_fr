import { SettingsRounded, SpellcheckRounded } from '@mui/icons-material'
import { Box, Button, Hidden, IconButton, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AdminContext from '../../context/admin/AdminContext'
import Profile from './Profile'


const useStyles = makeStyles((theme) => ({
    activeLink: {
        textDecoration: "none",
       
    },
    link: {
        textDecoration: "none",
        
    }
}))

export default function HeaderToolBar({handleDrawerToggle}){
    const {handleClickOpen} = useContext(AdminContext)
    const classes = useStyles()

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
                        sx={{ display: { lg: 'none' } }}
                    >
                        <img src="/images/menu.png" width="24px" />
                    </IconButton>

                    <Box width="100%" display="flex" justifyContent="flex-end">                     
                            
                        <Profile />
                    </Box>

                
                </Box>
          
            </Toolbar>
        </>
    )
}