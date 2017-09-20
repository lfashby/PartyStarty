import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Search from './search';
var axios = require('axios');

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			// events: [],
			// currentEvent: events[0]
			//queue: currentEvent.queue
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
			</div>
		)
	}
}

export default Home; 