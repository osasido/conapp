

import React,{Component
} from 'react';
import {Box,Text} from 'react-native-design-utility'
import {
  Dimensions,
  StyleSheet,
  Animated,
 Modal,
  Alert,
  TouchableHighlight, 
  View,
StatusBar,
KeyboardAvoidingView

} from 'react-native';
import Input from './../components/input';
import Button from './../components/button';
import { theme } from '../themes/theme';
import OnBoardingLogo from './../components/onboardingLogo'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from 'react-redux';
import Action from '../action/login'
//const {width:WIDTH} =Dimensions.get('window')
 class loginScreen extends Component{
 
 constructor(props){
   super(props)
   this.state = {
    user:"",
    pass:"",
    operate:'operate',
      // operation:"userlogin",
    // username: "",
    // password: "",
    // loading: false,
    opacity:new Animated.Value(0),
    position:new Animated.Value(0),
  

 
  };
  
// this.TabOption.bind(this)

  }
    
  // TabOption(){
  //   this.props.navigation.navigate('Main',{userName:this.state.username})
    
  // }

  componentDidMount(){
    Animated.parallel([this.positionAnim(), this.opacityAnim()]).start();

    
  }
 /* componentDidUpdate(){
    this.handleLogin();
    this.TabOption();
  }*/
  opacityAnim=()=>{
    Animated.timing(this.state.opacity,{
      toValue:1,
      duration:300,
      delay:200
    }).start()
  }
  positionAnim=()=>{
    Animated.timing(this.state.position,{
      toValue:1,
      duration:500,
      useNativeDriver:true,
    }).start()
  }
  
 handleLogin=async()=>{
  let { user, pass, } = this.state;
  this.props.login(user, pass);
 }
  
  // handleLogin= async() =>{
   
  //   this.setState({  loading: true });
  //   if (this.state.username === '') {
  //     Alert.alert("WRONG INPUT", "Publisher number cannot be empty");
  //       this.setState({  loading: false });
  //     return;
  //   }
  //   if (this.state.password === '') {
  //     Alert.alert("WRONG INPUT", "Password cannot be empty");
  //     this.setState({  loading: false });
  //     return;
  //   }
  //   const{username}=this.state
  //  const{password}=this.state
  //  const{operation}=this.state
 
  //   let baseUrl = 'https://congapp.infotechplanet.com/service/classes/login1.php'
     
  //  fetch(baseUrl /*'https://us-central1-socialapp-81a9e.cloudfunctions.net/api/login'*/, {
  //    method: 'POST',
  //    headers: {
  //     'Accept': 'application/json',
  //        'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify({ 
              
  //       username :username,
  //       password:password,
  //       operation:operation
       
       
  //    })
    
  //  }).then((response)=>response.json())
  //      .then(responseData => {
      
  //        let  name=responseData.Pub_No
  //        let info=responseData.Names
         
  //       if (name!=username ) {
  //         this.setState({  loading: false });
  //         Alert.alert("LOGIN ERROR", responseData+"We do not recognise you as a member of this congregation");
  //         return false
  //       }
        
  //       else {
           
         
  //         this.setState({  loading: false });
          
  //        Alert.alert('welcome  '+  info, "You are Welcome! JEHOVAH appreciates your Field Service Last Month. Please, Enter your monthly report.",
  //        [
         
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {text: 'OK', onPress:()=>   this.TabOption()}
  //       ],
  //       {cancelable: false},
  //     );
               
  //               }
         
  //   })
  //   .catch((error) => {
  //     this.setState({  loading: false });
  //     Alert.alert('Network Error', 'unable to send your report, please make sure you have internet access and try again.',
  //     [
  //        {
  //        text: 'ok',
  //        style: 'cancel',
  //      },
     
  //    ],
  //    {cancelable: false}); 
  //        });
    
    
  //    }
    
render() {
  
  const {opacity} = this.state; 
  const {isLoading}=this.props
  const logoTranslate =this.state.position.interpolate({
    inputRange:[0,1],
    outputRange:[130,0]
  })
  
 
    
    

 
  return(
      <Box  f={1} h={23} center bg= 'white'>
    
      <Animated.View style={{flex:1, transform:[{
        translateY:logoTranslate
      }] }}>
    <Box f={1} center>
    <OnBoardingLogo/>
    </Box>
</Animated.View>
    <Animated.View style={{flex:0.9,width:'100%' ,opacity}}  >
    
    

    <Box center>
    <StatusBar barStyle="light-content" backgroundColor="#0E877E" /> 
   
  <Box  h={40}  w={'77%'} position='absolute'>
  <Icons name={'person-outline'} size={23} color={'#0E877E'} />
  </Box>
  
   <Input
   value={this.state.username}
   placeholder='publisher number'
   onChangeText={data => this.setState({ user: data })}
        editable={true}
   />  
  
  </Box>
  <Box center>
   <Box  h={30}  w={'77%'} position='absolute'>
  <Icons name={'lock-outline'} size={23}  color={'#0E877E'}/>
  </Box>
 
     <Input
  Value={this.state.password}
   placeholder='password'
   onChangeText={data => this.setState({ pass: data })}
    secureTextEntry={true}
     
   />
   
</Box>

<Box center>

   <Button
             onPress={this.handleLogin.bind(this)}
             loading   >
             <Spinner color={theme.color.darkBlue} visible={isLoading} />
   
  <Text style={{color:theme.color.white, fontSize:20, fontWeight:'bold'}}>Login</Text></Button> 
     
</Box>
   
   </Animated.View> 
  
    </Box>
 

  );
}
}
const mapStateToProps=state=>{
  return{
   isLoading: state.login_reducer.isLoading,
  }
}
const mapDispatchToProps= dispatch=>{
  return {
    login: (username, password,operation) => dispatch(Action.login_action(username, password,operation))
};
} 
export default connect(mapStateToProps,mapDispatchToProps)(loginScreen);

