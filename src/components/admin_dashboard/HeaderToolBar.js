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
                    
                       

                            <NavLink activeClassName={classes.activeLink} to="/settings" >
                            <IconButton sx={{marginRight: "10px"}} onClick={handleClickOpen} >
                           
                                <SettingsRounded />
                                
                            </IconButton>
                                    
                            </NavLink>
                           

                            
                            
                        <Profile />
                    </Box>

                
                </Box>
          
            </Toolbar>
        </>
    )
}