import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
var axios = require('axios');

class Event extends React.Component {
	constructor(props){
		super(props)
		this.state = {
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
				<div>{this.props.currentEvent.title}</div>
				<div>{this.props.currentEvent.location}</div>
				<div>{this.props.currentEvent.date}</div>
				<div>{this.props.currentEvent.time}</div>
				<div>{this.props.currentEvent.description}</div>
				<Search />
			</div>
		)
	}
}

export default Event; 