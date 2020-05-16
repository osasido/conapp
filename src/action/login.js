import {Alert} from 'react-native';
import {types} from './types' 
import React from 'react';
import {  NavigationActions} from 'react-navigation';
let _navigator;``
const loading =bool=>{
  return {
    type: types.LOADING,
    isLoading: bool
};
}
const setTopLevelNavigator=(navigatorRef) => {
  _navigator = navigatorRef;
}
const navigate=(routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
const navigateProp=(routeName, params) => {
  _navigator.dispatch(
    NavigationActions.setParams({
       params,
    })
  );
}
   

 const login_action=(username,password)=>dispatch=> {
  dispatch(  loading (true) );
  if (username === "") {
    Alert.alert("WRONG INPUT", "Publisher number cannot be empty");
    dispatch(  loading (false) );
    return;
  }
  if (password === "") {
    Alert.alert("WRONG INPUT", "Password cannot be empty");
    dispatch(  loading (false) );
    return;
  }
 let operation="userlogin"
    let baseUrl = 'https://congapp.infotechplanet.com/service/classes/login1.php'
     
   fetch(baseUrl /*'https://us-central1-socialapp-81a9e.cloudfunctions.net/api/login'*/, {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
         'Content-Type': 'application/json',
     },
     body: JSON.stringify({ 
              
        username :username,
        password:password,
        operation:operation
       
       
     })
    
   }).then((response)=>response.json())
       .then(responseData => {
      
         let  name=responseData.Pub_No
         let info=responseData.Names
         
        if (name!=username ) {
          dispatch(  loading (false) );
          Alert.alert("LOGIN ERROR", responseData+"We do not recognise you as a member of this congregation");
          return false
        }
        
        else {
           
         
          dispatch(  loading (false) );
          
         Alert.alert('welcome  '+  info, "You are Welcome! JEHOVAH appreciates your Field Service Last Month. Please, Enter your monthly report.",
         [
         
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress:()=> navigate('Main', {userName:username}) }
        ],
        {cancelable: false},
      );
               
                }
         
    })
    .catch((error) => {
      dispatch(  loading (false) );
      Alert.alert('Network Error', 'unable to send your report, please make sure you have internet access and try again.',
      [
         {
         text: 'ok',
         style: 'cancel',
       },
     
     ],
     {cancelable: false}); 
         });
}
export default{
loading,
login_action,
setTopLevelNavigator,
navigate
}