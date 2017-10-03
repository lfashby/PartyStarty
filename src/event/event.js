import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../search';
var axios = require('axios');

class Event extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				{
					this.props.event ?
					(<div>
					<div>Title: {this.props.event.eventTitle}</div>
					<div>Location: {this.props.event.eventLocation}</div>
					<div>Time: {this.props.event.eventTime.slice(0,10)}</div>
					<div>Description: {this.props.event.eventDesc}</div>
					</div>) : null
				}
				<Search />
			</div>
		)
	}
}

export default Event;
