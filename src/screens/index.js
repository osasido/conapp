import { createSwitchNavigator,createAppContainer,} from 'react-navigation';
import { createBottomTabNavigator, } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../themes/theme';
import {Image} from 'react-native';
import {images} from './../themes/images';
import { Box } from 'react-native-design-utility';
import 'react-native-gesture-handler';
import HomeScreen from './homeScreen'
import SendReport from './sendReport'
import Settings from './settings'
import Faq from './fag'
import splashScreen from './splashScreen'
import LoginScreen from './loginScreen'
//import TabOptions  from "../action/login";
const AuthNavigator= createStackNavigator({
    
  Login:{
    screen:LoginScreen,
    
     navigationOptions:{
         header:null,
     }
 },
//  TabOptions:{
//   screen:TabOptions,
  
//    navigationOptions:{
//        header:null,
//    }
//},


});
const TabNavigator= createBottomTabNavigator({
    Home:{
        screen:HomeScreen,
        navigationOptions: {
            tabBarLabel:"Activity",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="timetable" size={30} color={theme.color.white} />
            )
          },
    },
    Send:{
       screen:SendReport,
        navigationOptions: {
          header:null,
            tabBarLabel:"Report",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="send" size={30} color={theme.color.white} />
            )
          },
    },
    Settings:{
       screen:Settings,
        navigationOptions: {
            tabBarLabel:"settings",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="settings-outline" size={30} color={theme.color.white} />
            )
          },
    },
    Faq:{
        screen:Faq,
        navigationOptions: {
            tabBarLabel:"FAQ",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="information-variant" size={30} color={theme.color.white} />
            )
          },
    },
},
    {
        order: ['Home','Send', 'Settings','Faq'],
        tabBarOptions: {
          activeTintColor: theme.color.grey,
          inactiveTintColor: theme.color.white,
          style: {
            backgroundColor: theme.color.darkBlue,
          }
        },
      },


  
);
const MainNavigator=createStackNavigator({
  
Auth:{
  screen:AuthNavigator,
  navigationOptions:{
    header:null,
}
},
Main:{screen:TabNavigator,

  navigationOptions:{
    title:'CongApp',
    headerStyle:{
        backgroundColor:theme.color.darkBlue
    },
    headerTintColor:theme.color.white,
    headerTitleStyle: {
        fontWeight: 'bold',
  
      },
     
      headerLeft: () => (
          <Box mb='xs' position='absolute'>
        <Image source={images.logo} style={{height:35 ,width:35}} />
        </Box>
      ),
   
  },
}
}




  

);
const Container = createSwitchNavigator({
    Splash:{
       screen:splashScreen
    },
      
  // Auth:AuthNavigator,
    Main:MainNavigator
},
{
    initialRouteName: 'Splash'
}
)

 const Navigate= createAppContainer(Container);
 export default Navigate
  