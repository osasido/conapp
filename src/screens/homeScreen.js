import React  from 'react';
import { Container, Header, Content, DatePicker, CardItem,Card, Button } from 'native-base';
import { StyleSheet,View,Platform,Text,ScrollView, TouchableOpacity } from 'react-native';
import {theme} from '../themes/theme'
import moment from 'moment'
import BackgroundTimer from 'react-native-background-timer'

function RoundButton({title,color,background,onPress,disabled}){
  return(
    <TouchableOpacity activeOpacity={ disabled ? 1.0:0.7} 
    onPress={()=> !disabled && onPress()}
     style={[styles.button,{backgroundColor:background}]}>
     
    <View style={styles.buttonBorder}>
   
      <Text style={[styles.buttonTile,{color}]}>
        {title}
      </Text>
     
      </View>
      
    </TouchableOpacity>
  )
}
function ButtonsRow({children}){
  return(
    <View style={styles.buttonsRow}>
  {children}
    </View>
  )
}
function Lap({number,interval, fastest,slowest}){
  const lapStyle=[
   styles.lapText,
   fastest &&styles.fastest,
   slowest && styles.slowest
  ]
return(
  <View style={styles.lap}>
    <Text style={lapStyle}>Lap{number}</Text>
    <Timer style={[styles.lapTime,lapStyle]} interval={interval}/>
  </View>
)
}
function LapsTable({laps,timer}){
  let finishedLaps= laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max=Number.MIN_SAFE_INTEGER
  if(finishedLaps.length >2  || finishedLaps.length ===2 ){
    finishedLaps.forEach(lap => {
      if (lap<min)min=lap
      if(lap>max)max=lap
    });
  }
  return(
    <ScrollView style={styles.scrollView}>
      {laps.map((lap,index)=>(
        <Lap 
        number={laps.length-index}
        key={laps.length-index}
         interval={index===0 ? timer+lap: lap}
         fastest={lap===min}
           slowest={lap===max}
         />
      ))}
    </ScrollView>
  )
}
function Timer({interval, styler}){
  const pad =(n)=>n < 10 ? '0'+n : n
  const duration =moment.duration(interval)
  return(
     <Text style={styler}>{pad(duration.hours())}:{pad(duration.minutes())}:{pad(duration.seconds())}</Text>
   
  )
   }
export default class DatePickerExample extends React.PureComponent{
   constructor(props) {
    super(props);
    this.state={
      start:0,
      now:0,
      laps:[]
    }
  }
  start=()=>{
    if (Platform.OS==='android'){
      BackgroundTimer.start();
    }  
const now = new Date().getTime()
this.setState({
  start:now,
  now,
  laps:[0]
})

this.timer=BackgroundTimer.setInterval(()=>{
  this.setState({
    now:new Date().getTime()
  })
},100)
}

stop=()=>{
 BackgroundTimer.clearInterval(this.timer)
  const {laps,now,start}= this.state
  const [firstLap, ...others]=laps
  this.setState({
    laps:[ firstLap + now - start,...others],
    start:0,
    now:0
  })
  BackgroundTimer.stop();
}
lap=()=>{
  const timeStamp= new Date().getTime()
  const {laps,now,start}= this.state
  const [firstLap, ...others]=laps
  this.setState({
    laps:[0, firstLap + now - start,...others],
    start:timeStamp,
    now:timeStamp
  })
}
 reset=()=>{
   this.setState({
        laps:[],
        start:0,
        now:0
   })
 }
 resume=()=>{
   const now= new Date().getTime()
   this.setState({
     start:now,
     now,
   })
   this.timer=BackgroundTimer.setInterval(()=>{
    this.setState({
      now:new Date().getTime()
    })
  },100)
 }
 componentWillMount(){
   BackgroundTimer.clearInterval(this.timer)
 }
   render(){
     const {now,start,laps}=this.state
     const timer= now-start
    return(
      <View style={styles.Container}>
      <Text  style={{color:'#0E877E', alignSelf:'center', fontSize:20,fontWeight:'900'}}>Field Service Timer </Text>
      <Card style={{justifyContent:'center', backgroundColor:theme.color.black}}>
        <Timer interval={laps.reduce((total,curr)=>total + curr,0) + timer} styler={styles.timer}/>
        {laps.length===0 && (
          <ButtonsRow>
        <RoundButton title='Lap' color={theme.color.greenLightest} background={theme.color.grey} disabled/>
        <RoundButton
         title='start'
          color={theme.color.green}
           background='#1B361F'
             onPress={this.start}
           />
        </ButtonsRow>
        )}

        {start>0 &&(
          <ButtonsRow>
        <RoundButton 
        title='Lap' color={theme.color.darkBlue} 
        background={theme.color.greyLighter}
          onPress={this.lap}
        />
        <RoundButton
         title='stop'
          color={theme.color.red}
           background={theme.color.redLightest}
             onPress={this.stop}
           />
        </ButtonsRow>
        )}
        {laps.length>0 && start===0 &&(
          <ButtonsRow>
        <RoundButton 
        title='Reset' 
        color={theme.color.darkBlue} 
        background={theme.color.greyLighter}
          onPress={this.reset}
        />
        <RoundButton
         title='resume'
         color={theme.color.green}
           background='#1B361F'
             onPress={this.resume}
           />
        </ButtonsRow>
        )}
        </Card>
       <LapsTable laps={laps} timer={timer}/>
      </View>
    )
  }
  r
}
const styles= StyleSheet.create({
  Container:{
    backgroundColor:theme.color.white,
    flex:1,
    paddingTop:50,
    paddingHorizontal:20
  },
  button:{
    width:65,
    height:65,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  },
  secondText:{
    fontSize:25
  },
  timer:{
    color:theme.color.darkBlue,
    fontSize:65,
    alignSelf:'center',
    fontWeight:'200',
  },
  buttonTile:{
    fontSize:18
  },
  buttonBorder:{
    width:65,
    height:65,
    borderRadius:36,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonsRow:{
flexDirection:'row',
alignSelf:'stretch',
justifyContent:'space-between',
marginTop:'10%',
marginBottom:30
  } ,
  lapText:{
    color:theme.color.darkBlue,
    fontSize:16,
     },
     lapTime:{
      width:40
     },
  lap:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:theme.color.greyLightest,
    borderWidth:1,
    paddingVertical:10,
    
  
  },
  scrollView:{
    alignSelf:'stretch'
  },
  fastest:{
    color:theme.color.green
  },
  slowest:{
    color:theme.color.red
  }
})

