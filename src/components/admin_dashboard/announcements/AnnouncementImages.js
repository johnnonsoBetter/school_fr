

import React from 'react'
import Carousel, { autoplayPlugin, Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Box } from '@mui/material';




class AnnouncementImages extends React.Component {
    constructor() {
      super()
      this.state = {
        value: 0,
        slides: [

         ( <Box width="100%" maxHeight="350px" >
            <img srcSet ="images/pta.jpg" alt="advert1" style={{maxWidth: "100%"}}/>
         </Box>),
         (<Box width="100%" maxHeight="350px" >
            <img srcSet ="images/inter.jpg" alt="advert2" style={{maxWidth: "100%"}}/>
         </Box>),
        ( <Box width="100%" maxHeight="350px" >
            <img srcSet ="images/holiday.jpg" alt="advert3" style={{maxWidth: "100%"}}/>
         </Box>)
        
        ],
      }
      this.onchange = this.onchange.bind(this);
    }
  
  
    onchange(value) {
      this.setState({ value });
    }
  
    render() {
      return (
      <Box minWidth={260} width={270}>
        <Carousel
          value={this.state.value}
          slides={this.state.slides}
          onChange={this.onchange}

         
          plugins={[
              
              {
              resolve: autoplayPlugin,
              options: {
                  interval: 4000,
              }
              },
          ]}   
          animationSpeed={1000}
      

        />
        <Dots value={this.state.value} onChange={this.onchange} number={this.state.slides.length} />
      </Box>
      );
    }
  }


export default AnnouncementImages
