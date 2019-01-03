import util from '../util/util'
import '../public/css/login.css';
import store from '../store/store';
import React, { Component } from 'react';
import {userRegisterApi} from '../util/api.js';
import {addUserInfo} from '../actions/userInfo_action.js'

class Login extends Component {
	constructor (props) {
		super(props)
		this.state = {
			name: '',
			idName: '',
			password: '',
		}
	}

	toSignIn () {
		this.props.history.push('/login');
	}

	changeState (e) {
		let name = e.currentTarget.name;
		let value = e.currentTarget.value;
		this.setState({[name]: value})
	}

	tapLogin (e) {
		if(!util.isMobile(this.state.idName)){
			alert('mobile error')
			return false;
		}
		userRegisterApi(this.state.name, this.state.idName, this.state.password, res => {
			if(res.data.code === 0){
				let userInfo = res.data.result;
				store.dispatch(addUserInfo(userInfo));
				this.props.history.push('/');
			}else{
				alert(res.data.msg)
			}
		})
	}

	render () {	
		return(
			<div className="login_view">
				<div className="login_row">
					<input 
						maxLength="10"
						className="login_input" 
						value={this.state.name} 
						onChange={this.changeState.bind(this)} 
						name="name" placeholder="nickName" type="text"/>
				</div>
				<div className="login_row">
					<input 
						maxLength="11"
						className="login_input" 
						value={this.state.idName} 
						onChange={this.changeState.bind(this)} 
						name="idName" placeholder="mobile" type="text"/>
				</div>
				<div className="login_row">
					<input className="login_input" 
						maxLength="20"
						value={this.state.password} 
						onChange={this.changeState.bind(this)}
						name="password" placeholder="password" type="password"/>
				</div>
				<button className="login_login" onClick={this.tapLogin.bind(this)}>sign up</button>
				<p className="sign_up" onClick={this.toSignIn.bind(this)}>sign in</p>
			</div>
		)
	}
}


export default Login;