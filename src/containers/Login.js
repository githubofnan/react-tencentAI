import '../public/css/login.css';
import store from '../store/store';
import React, { Component } from 'react';
import {userLoginApi} from '../util/api.js';
import {addUserInfo} from '../actions/userInfo_action.js'
import util from '../util/util';

class Login extends Component {
	constructor (props) {
		super(props)
		this.state = {
			idName: '',
			password: '',
		}
	}

	toSignUp () {
		this.props.history.push('/register');
	}

	changeState (e) {
		let name = e.currentTarget.name;
		let value = e.currentTarget.value;
		this.setState({[name]: value})
	}

	tapLogin (e) {
		if(!util.isMobile(this.state.idName)){
			return false;
		}
		userLoginApi(this.state.idName, this.state.password, res => {
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
						maxLength="11"
						className="login_input" 
						value={this.state.idName} 
						onChange={this.changeState.bind(this)} 
						name="idName" placeholder="your ID" type="text"/>
				</div>
				<div className="login_row">
					<input className="login_input" 
						maxLength="20"
						value={this.state.password} 
						onChange={this.changeState.bind(this)}
						name="password" placeholder="password" type="password"/>
				</div>
				<button className="login_login" onClick={this.tapLogin.bind(this)}>Login</button>
				<p className="sign_up" onClick={this.toSignUp.bind(this)}>sign up</p>
			</div>
		)
	}
}


export default Login;