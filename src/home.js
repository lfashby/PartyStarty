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
		// this.handleSignInClick = this.handleSignInClick.bind(this);
		// this.handleSignUpClick = this.handleSignUpClick.bind(this);
		// this.handleCreateClick = this.handleCreateClick.bind(this);
	}
	// EACH VIDEO LIST ENTRY SHOULD HAVE ONCLICK TO DIRECT TO /EVENTID
	// componentDidMount(){
		// axios.get('/home')
		// .then(data => {
		// 	this.setState({
		// 		events: data.events
		// 	}.bind(this))
		// })
		// .catch(error => {
		// 	console.log('ERROR retrieving events')
		// })
	// }
	// <Event event={this.state.currentEvent}/>
	// handleSignUpClick(){
	// 	axios.get('/signup')
	// 	.then(data => {
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	})
	// }
	// handleSignInClick(){
	// 	axios.get('/create')
	// 	.then(data => {
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	})
	// }
	// handleCreateClick(){
	// 	axios.get('/create')
	// 	.then(data => {
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	})
	// }

				// <button onClick={this.handleSignInClick}>Sign In</button>
				// <br></br>
				// <button onClick={this.handleSignUpClick}>Sign Up</button>
				// <br></br>
				// <button onClick={this.handleCreateClick}>Create</button>
	render(){
		return (
			<div>
				"Hey it's the home screen yall"
				<br></br>
				<Link to="/signup">Sign Up</Link>
				<br></br>
				<Link to="/signin">Sign In</Link>
				<br></br>
				<Link to="/create">Create</Link>
				<br></br>
			</div>
		)
	}
}

export default Home; 