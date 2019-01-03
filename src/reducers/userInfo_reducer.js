import {ADD_USERINFO} from '../actions/userInfo_action.js'

export default function(state={}, action){
	switch (action.type) {
		case ADD_USERINFO:
			return {
				...state,
				userInfo: action.payload,
			}
		default:
			return {
				...state,
			};
	}
}