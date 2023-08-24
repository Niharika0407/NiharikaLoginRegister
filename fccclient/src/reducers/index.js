import { combineReducers } from 'redux';
import auth from './auth.js'; 

const reducers = combineReducers({
    auth: auth
    
  });
  
  export default reducers;
