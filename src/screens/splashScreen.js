

import React, {Component} from 'react';
import{StatusBar} from 'react-native';
import {Box,Text} from 'react-native-design-utility'
import OnBoardingLogo from  '../components/onboardingLogo'
 class SplashScreen extends Component{
    state = {
      
    };

  componentDidMount() {
      this.checkAuth();
    }
  
    checkAuth = async () => {
    setTimeout(()=>{
    this.props.navigation.navigate('Auth')
},3000)
    };
render() {
   
  return(
    <Box f={1} center>
      <StatusBar barStyle='light-content' />
          <OnBoardingLogo />
           </Box>
         
  );
}
}
export default SplashScreen



