import React from 'react';
import ReactDOM from 'react-dom';

class SignUp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
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
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleUserInput} type="text" defaultValue="Username" />
					<input onChange={this.handlePasswordInput} type="text" defaultValue="Password" />
					<input type="submit" value="Sign Up"/>
				</form>
			</div>
		)
	}
}

export default SignUp; 