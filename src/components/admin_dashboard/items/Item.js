import { AccessibleForwardRounded, AddRounded, AddShoppingCartRounded, CheckBoxRounded, ClassRounded, Edit, EditRounded, NotificationAddRounded, VisibilityOutlined } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Chip, Divider, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import { blue, green, grey, orange, red } from '@mui/material/colors'
import React, { useState } from 'react'
import AmountFormater from '../../utilities/AmountFormatter'
import ItemRestocker from './ItemRestocker'
import ItemStocker from './ItemStocker'
import ItemSaler from './ItemSaler'
import EditItem from './EditItem'



export default function Item(props){

    const { id, name, selling_price, quantity} = props.item 
    const [restockerOpened, setOpenRestocker] = useState(false)
    const [stockerOpened, setOpenStocker] = useState(false)
    const [salerOpened, setOpenSaler] = useState(false)
    const [editOpened, setEditOpened] = useState(false)

    const closeAll = () => {
        setOpenRestocker(false)
        setOpenSaler(false)
        setOpenStocker(false)
        setEditOpened(false)
    }

    const openRestocker = () => {
        setOpenRestocker(true)
        setOpenSaler(false)
        setOpenStocker(false)
        setEditOpened(false)
    }

    const openStocker = () => {
        setOpenRestocker(false)
        setOpenSaler(false)
        setOpenStocker(true)
        setEditOpened(false)
    }

    const openSaler = () => {
       
        setOpenSaler(true)
        setOpenRestocker(false)
        setOpenStocker(false)
        setEditOpened(false)
    }

    const openEdit = () => {
       
        setOpenSaler(false)
        setOpenRestocker(false)
        setOpenStocker(false)
        setEditOpened(true)
    }

    
    return (
        <Box sx={{width: '100%', padding: "5px"}} >
            <Paper elevation={3} sx={{borderRadius: "13px"}} >

            {
                editOpened ? <EditItem name={name} selling_price={selling_price} closeAll={closeAll} id={id} /> :
            <>
           
            <Box sx={{ p: 2, display: 'flex', alignItems: "center" }}>
                <Typography sx={{textTransform: "capitalize"}} fontWeight={800}>{name}</Typography>
            </Box>

            <Box sx={{pl: 2, display: "flex", alignItems: 'center', justifyContent: "flex-start"}} >
            
                <Avatar sx={{bgcolor: blue[600], color: "white"}} > {quantity}</Avatar>
                <IconButton onClick={() => openEdit()} size="small" color="warning" sx={{ml: 2}} >
                    <EditRounded fontSize="10px" />
                </IconButton>
        
            </Box>
          
       
            <Box sx={{p: 2, display: "flex", alignItems: 'center', justifyContent: "space-between"}} >
            
                <Typography variant="h5"> ₦{AmountFormater(selling_price).amount()} </Typography>
           
             </Box>

             {

                 restockerOpened ? <ItemRestocker id={id} closeAll={closeAll} /> :
                 stockerOpened ?  <ItemStocker  id={id} closeAll={closeAll} /> :
                 salerOpened ? <ItemSaler selling_price={selling_price} quantity={quantity}  id={id} closeAll={closeAll} /> :
                 
                <Box pl={2} pb={2} pr={2} display="flex" justifyContent="space-between" >
                    <Box >
                        <Button size="small" variant="outlined" color="secondary" onClick={() => openRestocker()} >Add</Button>
                    </Box>
                    <Box >
                        <Button size="small" variant="outlined" onClick={() => openStocker()}  >Take Stock</Button>
                    </Box>
                    <Box >
                        <Button size="small" variant="outlined" onClick={() => openSaler()} color="success" >Sale</Button>
                    </Box>
                </Box>

                }

              </>
            }
        </Paper>
      </Box>
    )
} 