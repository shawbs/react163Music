import React, {Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Link,hashHistory} from 'react-router';
import {Button,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

import '../style/login.scss';


class LoginForm extends Component{
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
	}
	handleLogin(){
		localStorage.loginState = true;
		console.log(this.refs.usernameInput)
		//hashHistory.push(`/`);
	}
	render(){
		return (
			<div className="logon-form">
				<FormGroup>
					<ControlLabel>name:</ControlLabel>
					<FormControl type="text" placeholder="123..." ref="usernameInput"/>
				</FormGroup>
				<Button bsStyle="primary" onClick={this.handleLogin}>sign in</Button>
				<Button bsStyle="success">
					<Link to="/login/register">sign up</Link>	
				</Button>	
			</div>
		)
	}
}

class Login extends Component{
	render(){
		return (
			<div>
				<h1>login page <Link to="/">to home</Link></h1>
				<LoginForm />
				<Link to="/login/getpwd">忘记密码</Link>
			</div>
		)
	}
}

class Getpwd extends Component{
	render(){
		return (
			<div>
				<h1>找回密码页 page <Link to="/login">返回登录页</Link></h1>
			</div>
		)
	}
}

class Register extends Component{
	render(){
		return (
			<div>
				<h1>注册页 page <Link to="/login">返回登录页</Link></h1>
			</div>
		)
	}
}

export {Login,Getpwd,Register}

export default class LoginGroup extends Component{
	render(){
		return (
			<div className="login-page container">
				{this.props.children}
			</div>
		)
	}
}