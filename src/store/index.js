import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import login_reducer from '../reducers/login_reducer';
const rootReducer= combineReducers({
    login_reducer:login_reducer
});
const middleware=[thunk];
const configStore=()=> createStore(rootReducer,applyMiddleware(...middleware))
export default configStore;