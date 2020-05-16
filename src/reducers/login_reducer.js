import {types} from '../action/types'
const initialState={
    operation:"userlogin",
    username: "",
    password: "",
    isLoading: false
};
const  login_reducer = (state=initialState,action)=>{
   const {type,payload} =action
    switch(type){
        case types.LOGIN:{
            return  Object.assign({},state,{
                username:payload.username,
                password:payload.password,
              
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