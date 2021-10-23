import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FetchContext } from '../../../context/FetchContext'
import { Box, Chip } from '@mui/material'
import Empty from '../../utilities/Empty'
import FailedFetch from '../../utilities/FailedFetch'
import Loader from '../../utilities/Loader'
import GroupedStudentFilterInput from './GroupStudentFilterInput'
import Item from './Item'
import { ItemContextProvider } from '../../../context/admin/ItemContext'


export default function ItemContainer(){

    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {authAxios} = useContext(FetchContext)
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])

    useEffect(() => {

        authAxios.get('api/v1/items').then((res) => {
            
            setLoading(false)
            setItems(res.data)
            setAllItems(res.data)
        }).catch(err => {
            setFailed(true)
            setLoading(false)
        })

        return () => {
            setLoading(true)
            setFailed(false)
            setItems([])
            setAllItems([])
        }
    }, [])

    return (
        <>
            <ItemContextProvider 

                value={{
                    items,
                    allItems,
                    setItems,
                    setAllItems,
                    
                }}
            
            >

            
            <Box p={1} justifyContent="space-between" sx={{display: { sm: 'flex' }}} alignItems="center" >

            <Box display="flex" alignItems="center"  >
                <Typography sx={{fontWeight: "bolder"}} variant="h4">All Items</Typography>
                 <Chip variant="outlined" sx={{ml: "16px", textTransform: "capitalize"}} label={`${allItems.length}`} />
            </Box>

            {
                allItems !== 0 && 
                 <Box mt={1} >
                    
                     <GroupedStudentFilterInput allItems={allItems} setItems={setItems} />
                
                </Box>
            }
            
            </Box>

            <Box >

                {
                    loading ? 
                    <Loader /> :
                    failed ?
                    <FailedFetch message="Failed To Load Items" height="calc(90vh - 200px)"/> : 
                    <>  
                        {
                            items.length === 0 ? 
                            <Empty message="No Items Found" height="calc(90vh - 200px)"/> :
                            <Box flexGrow={1} mt={2} maxHeight="calc(94vh - 200px)" overflow="auto" >
                                <Grid container >
                                    {
                                        items.map((item) => {

                                            return (<Grid key={item.id} item xs={12} sm={6} md={4} > <Item item={item} /> </Grid>)
                                            
                                        })
                                    }
                                </Grid>
                            </Box>

                        }

                    </> 
                }

            </Box>
            </ItemContextProvider>
        </>
    )
}