import React from 'react';
import ReactDOM from 'react-dom';

class Event extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div>{this.props.event && this.props.event.eventTitle}</div>
				<div>{this.props.event && this.props.event.eventLocation}</div>
				<div>{this.props.event && this.props.event.eventTime}</div>
				<div>{this.props.event && this.props.event.eventDesc}</div>
			</div>
		)
	}
}

export default Event;
