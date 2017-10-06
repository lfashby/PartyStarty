import React from 'react';
import ReactDOM from 'react-dom';
var axios = require('axios');
import {Link, withRouter} from 'react-router-dom';
import Navbar from './navbar';

class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: "",
			phone: "",
			isAuth: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
		this.handlePhoneInput = this.handlePhoneInput.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		axios.post('/signup', {username: this.state.username, password: this.state.password, phone: this.state.phone})
		.then((response) => {
			console.log(response);
			this.props.history.push('/signin');
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

	handlePhoneInput(e) {
		this.setState({phone: e.target.value});
	}

	render(){
		return (
			<div>
				<div className="signInForm">
				<form className="" onSubmit={this.handleSubmit}>
					<h2>Sign Up</h2>
					<div className="form-group">
						<input className="form-control userInput" onChange={this.handleUserInput} value={this.state.username} type="text" placeholder="Username" />
						<input className="form-control passInput" onChange={this.handlePasswordInput} value={this.state.password} type="password" placeholder="Password" />
						<input className="form-control passInput" onChange={this.handlePhoneInput} value={this.state.phone} type="tel" placeholder="Phone xxxxxxxxxx" pattern="^\d{10}$" required/>
					</div>
					<button className="btn btn-secondary">Sign Up</button>
				</form>
				</div>
			</div>
		)
	}
}

export default withRouter(SignUp); 