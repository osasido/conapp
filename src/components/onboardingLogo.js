

import React from 'react';
import {Box,Text} from 'react-native-design-utility'
import {Image} from 'react-native';
import{images} from '../themes/images';
const OnBoardingLogo = () =>{
   return( <Box  center>
      <Box mb="sm" h={43}>
      <Image source={images.logo}/>
      </Box>
       <Box mb='xs' h={33}>
       <Text size='xl'>Cong<Text color='#0E877E' size='xl'>App</Text></Text>
       </Box>
       <Text size='sm'  color='#0E877E'>Field Service Report</Text> 
      </Box>);
             
 
  
}



export default OnBoardingLogo;
