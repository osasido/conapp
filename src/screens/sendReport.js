import React, { Component } from 'react';
import Button from './../components/button';
import{Box,Text} from 'react-native-design-utility';
import {Alert} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import { theme } from '../themes/theme';
import { Container, Header, Content, Form,Textarea, Item, Picker,Input, Label,Icon, DatePicker, Card,CardItem ,Tabs,Tab,TabHeading,} from 'native-base';
import { Value } from 'react-native-reanimated';

export default class SendReport extends Component {
 
  constructor(props) {
    super(props);
    const  months=['1','2','3','4','5','6','7','8','9','10','11','12']
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const date = new Date()
   const newDate=new Date(date.setMonth(date.getMonth()-1));  
  const cii=newDate.getMonth().toString()  
  const coo=newDate.getMonth().toString() 
    this.state = {
      operation:'Adding',
      placements:'',
      videos:'',
      hours:'',
      rv:'',
      bs:'',
      monthText:monthNames[coo],
      months:months[cii],
      status: undefined,
       loading:false
      
   };
}
  
viewReport= ()=>{
  this.setState({  loading: true });
      if (this.state.status == undefined) {
      Alert.alert("WRONG INPUT", "please select a publisher status");
      this.setState({  loading: false });
      return;
    }
    
  if (this.state.hours == '') {
    Alert.alert("WRONG INPUT", "hours field is empty");
    this.setState({  loading: false });
    return;

  }
  if (this.state.bs>this.state.rv ) {
    Alert.alert("INVALID REPORT", "bible study cannot be more than return visit. Please see your secretary for more information ");
    this.setState({  loading: false });
    return;

  }
  
 
  this.setState({  loading: false });

  Alert.alert('CONFIRMATION',
    'month :' + this.state.monthText+`\n` + 
     'hours :' + this.state.hours+`\n`+
     'status :' + this.state.status +`\n`+
     'bible study :' + this.state.bs +`\n`+
      'videos :' + this.state.videos +`\n`+
      'placements :' + this.state.placements +
      `\n`+'return visits :' + this.state.rv +`\n`,
   
   [
   {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  {text: 'OK', onPress: () =>this.handleReport()  },
],
{cancelable: false});
}
  /* onValueChange2(cii:string  ) {
    const  months=['1','2','3','4','5','6','7','8','9','10','11','12']
     const date = new Date()
    const newDate=new Date(date.setMonth(date.getMonth()-1));  
    cii=newDate.getMonth().toString()  
    this.setState({
      months:months[cii]
    });
  }*/
  onValueChange1(value:string  ) {
    
    this.setState({
      status:value
    });
  }
 
  handleReport= async  () =>{
    this.setState({  loading: true });
    const publisherNo = this.props.navigation.getParam('userName', 'NO-User');
    const {hours}=this.state
    const{operation}=this.state
    const{months}=this.state
   const{status}=this.state
   const{rv}=this.state
   const{bs}=this.state
   const{videos}=this.state
   const{placements}=this.state
    let baseUrl = 'https://infotechplanet.com/congapp/service/classes/addReport1.php'
    
   fetch(baseUrl /*'https://us-central1-socialapp-81a9e.cloudfunctions.net/api/login'*/, {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
         'Content-Type': 'application/json',
     },
     body: JSON.stringify({ 
         operation:operation,
         publisherNo:publisherNo,
         thecurrentMonth:months,
         months:months,
         status:status,
         hours:hours,
         rv:rv,
         bs:bs,
         videos:videos,
         placements:placements,
        
       
     })
        
    
   }).then(response=>
      response.json())
       .then(responseData => {
       
            this.setState({  loading: false })
            return Alert.alert(responseData.type,responseData.message)
       
                               
     }) .catch((error) => {
      this.setState({  loading: false });
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
  onText(e){
  return /^\d+$/.test(e.toString()) ? true : false
 }
  // nonZero(e){
//return /0/.test(parseInt(e))? false : true
  // }
   validationVideos(e){
  return  this.onText(e) 
  ? this.setState({
    videos: parseInt(e),
    }) :this.setState({
      videos: '',
      })
   }
   validationBs(e){
    return  this.onText(e) 
    ? this.setState({
    
      bs: parseInt(e),
        }) : this.setState({
    
          bs: '',
            })
     }
     validationHours(e:string){
      if( this.onText(e) ){
        this.setState({
        hours: e,
        
      })
    }else{
      this.setState({
        hours:'',
        
      })
    }
       
       }
       validationPlacements(e){
        return  this.onText(e) 
        ? this.setState({
         placements: parseInt(e),
        }) :  this.setState({
          placements: '',
         })        }
         validationRv(e){
          return  this.onText(e) 
          ? this.setState({
            rv: parseInt(e),
            }) : this.setState({
              rv: '',
              })
           }
        //   validationHours(value: string) { return /0/.test(value) && /^\d+$/.test(value) ? this.setState({hours: value }) : false; }
  render(){
        return (
      
      <Container >
        
        <Content padder >
      
             
              <Text  size='xl' color='#0E877E' >Send Report</Text>
             
            <Card collapsable style={{backgroundColor:theme.color.greyLighter}}> 
        <Form>
         
          <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="status"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.status}
                onValueChange={this.onValueChange1.bind(this)}
              >
               <Picker.Item label="publisher status"  />
                <Picker.Item label="Publisher" value="PUB" />
                <Picker.Item label="Auxiliary Pioneer" value="AUX" />
                <Picker.Item label="Regular Pioneer" value="REG" />
                
              </Picker>
            </Item>
            <Item floatingLabel>
              <Label>Placements</Label>
              <Input 
              onChangeText={(e)=> this.validationPlacements(e)}
                  keyboardType={'number-pad'}
                  value={this.state.placements}
                  maxLength={10} 
              />
            </Item>
            <Item floatingLabel >
              <Label>Videos</Label>
              <Input
              onChangeText={(e)=> this.validationVideos(e)}
                  keyboardType={'number-pad'}
                  value={this.state.videos}
                  maxLength={10} 
                  />
            </Item>
            <Item floatingLabel >
              <Label>Hours</Label>
              <Input
              onChangeText={ this.validationHours.bind(this)}
                  keyboardType={'number-pad'}
                  value={this.state.hours}
                  maxLength={10} 
                  />
            </Item>
            <Item floatingLabel >
              <Label>Return Visit</Label>
              <Input
          onChangeText={(e)=> this.validationRv(e)}
                  keyboardType={'number-pad'}
                  value={this.state.rv}
                
                  maxLength={10} 
                  />
            </Item>
            <Item floatingLabel >
              <Label>Bible Study</Label>
              <Input
             onChangeText={(e)=> this.validationBs(e)}
                  keyboardType={'number-pad'}
                  value={this.state.bs}
                  maxLength={10}  />
            </Item>
          
          </Form>
          </Card>
         
            <Box f={1}>
      <Button style={{width:'100%',borderRadius:10}}
      onPress={this.viewReport.bind(this)}>
            <Text>submit</Text>
          </Button>
      </Box>
      <Spinner color={theme.color.darkBlue} visible={this.state.loading} />
        </Content>
       
      </Container>
   
    );
    }  
}
