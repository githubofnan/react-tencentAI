import {combineReducers} from 'redux'
import addUserInfoReducer from './userInfo_reducer.js'

const allReducers = {
	user: addUserInfoReducer,
}

export default combineReducers(allReducers);

