import React from 'react';
import ReactDOM from 'react-dom';
var axios = require('axios');

class Event extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			currentEvent: {this.props.event}
			//queue: currentEvent.queue
		}
	}
	// ADD QUEUE COMPONENT
	// ADD GUEST LIST 


	// componentDidMount(){
	// 	axios.get(`/${this.currentEvent._id}`)
	// 	.then(data => {
	// 		this.setState({
	// 			events: data.events
	// 		})
	// 	}.bind(this))
	// 	.catch(error => {
	// 		console.log('ERROR retrieving events')
	// 	})
	// }

	render(){
		return (
			<div>
				<div>{this.state.currentEvent.title}</div>
				<div>{this.state.currentEvent.location}</div>
				<div>{this.state.currentEvent.time}</div>

			</div>
		)
	}
}

export default Event; 