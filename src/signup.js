import React from 'react';
import ReactDOM from 'react-dom';
var axios = require('axios');
import {Link} from 'react-router-dom';

class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);
	}

		handleSubmit(){
		axios.post('/signup', {username: this.state.username, password: this.state.password})
		.then((response) => {
			console.log(response);
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
			<div>
				<Link to="/signup"></Link>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleUserInput} type="text" placeholder="Username" />
					<input onChange={this.handlePasswordInput} type="text" placeholder="Password" />
					<input type="submit" value="Sign Up"/>
				</form>
			</div>
		)
	}
}

export default SignUp; 