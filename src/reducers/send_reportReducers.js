import {types} from '../action/types'
const date = new Date()
const newDate=new Date(date.setMonth(date.getMonth()-1));  
const cii=newDate.getMonth().toString()  
const  months=['1','2','3','4','5','6','7','8','9','10','11','12']
const initialState={
    placements:'',
    videos:'',
    hours:'',
    rv:'',
    bs:'',
    months:months[cii],
    status: undefined,
     loading:false
    
};
const  login_reducer = (state=initialState,action)=>{
   const {type,payload} =action
    switch(type){
        case types.SEND_REPORT:{
            return  Object.assign({},state,{
         publisherNo:payload.publisherNo,
         thecurrentMonth:payload.months,
         months:payload.months,
         status:payload.status,
         hours:payload.hours,
         rv:payload.rv,
         bs:payload.bs,
         videos:payload.videos,
         placements:payload.placements,
              
            })
             
        }
        case types.LOADING:{
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        }
        default:
      return state;
    }

};
export default login_reducer;