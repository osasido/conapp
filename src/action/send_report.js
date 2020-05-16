import {types} from './types';
import {Alert} from 'react-native'
const loading =bool=>{
    return {
      type: types.LOADING,
      isLoading: bool
  };
  }
  const view_report =(status,hours,bs,rv,placements,monthText,videos)=>dispatch=>{
    dispatch(  loading (true) );
    if (status == undefined) {
    Alert.alert("WRONG INPUT", "please select a publisher status");
    dispatch(  loading (false) );
    return;
  }
  
if (hours == '') {
  Alert.alert("WRONG INPUT", "hours field is empty");
    dispatch(  loading (false) );
  return;

}
if (bs>rv ) {
  Alert.alert("INVALID REPORT", "bible study cannot be more than return visit. Please see your secretary for more information ");
    dispatch(  loading (false) );
  return;

}


  dispatch(  loading (false) );

Alert.alert('CONFIRMATION',
  'month :' +monthText+`\n` + 
   'hours :' +hours+`\n`+
   'status :' +status +`\n`+
   'bible study :' +bs +`\n`+
    'videos :' +videos +`\n`+
    'placements :' +placements +
    `\n`+'return visits :' +rv +`\n`,
 
 [
 {
  text: 'Cancel',
  onPress: () => console.log('Cancel Pressed'),
  style: 'cancel',
},
{text: 'OK', onPress: () =>dispatch(send_report())  },
],
{cancelable: false});
  }
const send_report =(operation, publisherNo, months,status,hours,rv,bs,videos,placements)=>dispatch=> {
    dispatch(  loading (true) );
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
          
            dispatch(  loading (false) );
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
