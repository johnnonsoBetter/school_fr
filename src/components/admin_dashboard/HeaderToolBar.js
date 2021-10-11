import { SpellcheckRounded } from '@mui/icons-material'
import { Box, Button, Hidden, IconButton, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import AdminContext from '../../context/admin/AdminContext'
import Profile from './Profile'

export default function HeaderToolBar({handleDrawerToggle}){
    const {handleClickOpen} = useContext(AdminContext)
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
                    
                        <Hidden smDown >
                            <Button variant="outlined" onClick={handleClickOpen} endIcon={<SpellcheckRounded />} sx={{marginRight: "20px", fontWeight: "bolder", color: "black"}}>Create Draft</Button>
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