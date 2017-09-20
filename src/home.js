import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
var axios = require('axios');

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			events: [],
			currentEvent: events[0]
			//queue: currentEvent.queue
		}
	}
	// EACH VIDEO LIST ENTRY SHOULD HAVE ONCLICK TO DIRECT TO /EVENTID
	componentDidMount(){
		axios.get('/home')
		.then(data => {
			this.setState({
				events: data.events
			}.bind(this))
		})
		.catch(error => {
			console.log('ERROR retrieving events')
		})
	}

	render(){
		return (
			<div>
				"Hey it's the home screen yall"
				<Event event={this.state.currentEvent}/>
			</div>
		)
	}
}

export default Home; 