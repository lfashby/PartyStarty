import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './create';
var axios = require('axios');

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			// events: [],
			// currentEvent: events[0]
		}
	}
	// EACH VIDEO LIST ENTRY SHOULD HAVE ONCLICK TO DIRECT TO /EVENTID
	componentDidMount(){
		// axios.get('/home')
		// .then(data => {
		// 	this.setState({
		// 		events: data.events
		// 	}.bind(this))
		// })
		// .catch(error => {
		// 	console.log('ERROR retrieving events')
		// })
	}
	// <Event event={this.state.currentEvent}/>
	handleSignUpClick(){
		axios.get('/signup')
		.then(data => {
		})
		.catch(error => {
			console.log(error);
		})
	}
	handleSignInClick(){
		axios.get('/create')
		.then(data => {
		})
		.catch(error => {
			console.log(error);
		})
	}
	handleCreateClick(){
		axios.get('/create')
		.then(data => {
		})
		.catch(error => {
			console.log(error);
		})
	}
	render(){
		return (
			<div>
				"Hey it's the home screen yall"
				<button>Sign In</button>
				<br></br>
				<button>Sign Up</button>
				<br></br>
				<button>Create</button>
			</div>
		)
	}
}

export default Home; 