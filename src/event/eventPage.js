import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import EventVoter from './eventVoter.js';
import EventWinnerDisplay from './eventWinnerDisplay.js';
import Chat from '../chat.js'

class EventPage extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      event: {},
			eventFinalized: false,
			threeMovies: []
    }
  };
	

	getEvent() {
		axios.get('/events/:event_id')
			.then(res => {
				this.setState({
					threeMovies: res.data.movies,
					event: res.data.event
				})
			})
			.catch(err => {
				res.send(err);
			})
	}

  onComponentDidMount() {
		this.getEvent();
  }

	render(){
		const eventFinalized = this.state.eventFinalized;
		
		let topBox = null;
		if (!eventFinalized) {
			topBox = <EventVoter threeMovies={this.state.threeMovies}/>;
		} else {
			topBox = <EventWinnerDisplay event={this.state.event} threeMovies={this.state.threeMovies}/>;
		}
		
		return (
			<div>
				{topBox}
				<Chat />
			</div>
		)
	}
}

export default EventPage;
