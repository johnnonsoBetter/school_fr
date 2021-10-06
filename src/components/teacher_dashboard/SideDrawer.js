import { Drawer, Toolbar } from '@mui/material'
import React from 'react'
import SideNav from './SideNav'


export default function SideDrawer(props){
    const { window } = props;
    const {handleDrawerToggle, mobileOpen} = props
    const drawerWidth = 250
    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
        <Toolbar />
        <SideNav  handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    )
}