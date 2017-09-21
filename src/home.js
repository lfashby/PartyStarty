import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './create';
import Navbar from './navbar';
import EventList from './eventList.js';
var axios = require('axios');

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			events: []
			// currentEvent: events[0]
		}
		this.componentWillMount = this.componentWillMount.bind(this);
	}
	componentWillMount(){
		axios.get('/getEvents')
		.then(data => {
			console.log('have data',data.data[0])
			this.setState({
				events: data.data
			})
			console.log(this.state.events)
		})
		.catch(error => {
			console.log('ERROR retrieving events')
		})
	}
	componentDidMount() {

	}
	render(){
		return (
			// !this.state.events? <div>Loading</div>:
			<div>


			<Navbar />
			
     		<h4 id="home">HOME SCREEN</h4>
			<div className= "EventList"> 
				<EventList events={this.state.events}/>
				</div>
			</div>
		)
	}
	
}

export default Home; 

// this.handleSignInClick = this.handleSignInClick.bind(this);
		// this.handleSignUpClick = this.handleSignUpClick.bind(this);
		// this.handleCreateClick = this.handleCreateClick.bind(this);
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