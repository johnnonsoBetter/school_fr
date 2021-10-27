import { Box, Drawer, SwipeableDrawer, Toolbar } from '@mui/material'
import React from 'react'
import SideNav from './SideNav'


export default function SideDrawer(props){
    const { window } = props;
    const {handleDrawerToggle, mobileOpen} = props
    const drawerWidth = 280
    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <SwipeableDrawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
        
        <Box p={1} display="flex" justifyContent="center"  width="100%"  ><img style={{maxWidth: "100%", marginRight: "16px"}} src="/images/logo.png" alt="logo" /></Box>

        <SideNav  handleDrawerToggle={handleDrawerToggle} />
      </SwipeableDrawer>
    )
}