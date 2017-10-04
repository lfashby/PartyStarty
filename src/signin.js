import React from 'react';
import ReactDOM from 'react-dom';
import {Link , Redirect, withRouter} from 'react-router-dom';
import Navbar from './navbar'
var $ = require('jquery');
var axios = require('axios');

class SignIn extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
	}

	handleSubmit(event){
		console.log(this.state.username, this.state.password);
		axios.post('/signin', {username: this.state.username, password: this.state.password})
		.then((response) => {
			console.log("res data ", response.data);
			console.log("auth: ", this.state.auth);
			if(!(response.data === 'error')) {	
				this.props.login(this.state.username, this.state.password);
				this.props.history.push('/');
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

	handleUserInput(e){
		this.setState({username: e.target.value});
	}
	handlePasswordInput(e){
		this.setState({password: e.target.value});
	}

	render(){
		
		return (
			
			<div ref="myRef">
				<Navbar />
				<div  className="signInForm">
				<form className="">
					<h2>Sign In</h2>
					<div className="form-group">
					<input className="form-control userInput" onChange={this.handleUserInput} type="text" placeholder="Username" />
					<input className="form-control passInput" onChange={this.handlePasswordInput} type="password" placeholder="Password" />
					</div>
					<Link to="/home" id="signin" className="btn btn-secondary signIns" onClick={this.handleSubmit}>Sign In</Link>
					<Link to="/signup" className="btn btn-secondary">Sign Up</Link>
				</form>
				</div>
			</div>
		)
	}
}

export default withRouter(SignIn); 