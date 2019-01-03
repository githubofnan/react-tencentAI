export const ADD_USERINFO = 'ADD_USERINFO';

export function addUserInfo(msg){
	return {
		type: ADD_USERINFO,
		payload: msg,
	}
}