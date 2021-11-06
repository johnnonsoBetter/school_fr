

import React, { useState } from 'react'
import Carousel, { autoplayPlugin, arrowsPlugin, Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


export default function AnnouncementList(props) {

    const {slides} = props
    const [value, setValue] = useState(0)

    function handleChange(value) {
        setValue(value);
    }

    return (
        <Box minWidth={260} width="100%">
           
          <Carousel
            value={value}
            slides={slides}
            onChange={handleChange}
   
            animationSpeed={1000}
        
            plugins={['infinite']}
          />
          <Dots value={value} onChange={handleChange} number={slides.length} />
        </Box>
        );

}
