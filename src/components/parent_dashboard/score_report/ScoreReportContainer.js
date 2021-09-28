import { Box, List, ListSubheader } from '@mui/material'
import React from 'react'
import Loader from '../../utilities/Loader'
import ScoreReports from './ScoreReports'
import TheDate from './TheDate'

function ScoreReport(){

    return (
        <Box  >
            <Box display="flex" justifyContent="flex-end"  >
                <TheDate />

            </Box>
            {/* <Loader /> */}

            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: "calc(95vh - 200px)",
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
                >
                {["Mathematics", "English", "Physics"].map((sectionId) => (
                    <li key={`section-${sectionId}`}>
                    <ul>
                        <ListSubheader sx={{fontWeight: "bold", letterSpacing: "0.1em"}}>{`${sectionId}`}</ListSubheader>
                        <ScoreReports />
                    </ul>
                    </li>
                ))}
            </List>
        </Box>
    )
}

export default ScoreReport
