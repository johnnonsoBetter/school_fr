import React from 'react'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Box } from '@mui/material';


function Children(){


    return (
        <Box width="200px" >
            <Carousel
            plugins={[
                'infinite',
                'centered',
                
                    {
                    resolve: slidesToShowPlugin,
                    options: {
                    numberOfSlides: 1
                    }
                    },
                ]}
                >
                <Chip clickable avatar={<Avatar>M</Avatar>} label="Chime John" />
                <Chip clickable avatar={<Avatar>M</Avatar>} label="Paul Mike" />
                <Chip clickable avatar={<Avatar>M</Avatar>} label="Joney Chukwuka" />
            </Carousel>

        </Box>
        
    )
}

export default Children


