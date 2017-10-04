import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import EventVoter from './eventVoter.js';
import EventWinnerDisplay from './eventWinnerDisplay.js';

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
		
		if (!eventFinalized) {
			return <
				EventVoter 
					threeMovies={this.state.threeMovies}
			/>
		} else if (eventFinalized) {
			return <
				EventWinnerDisplay
					event={this.state.event}
					threeMovies={this.state.threeMovies}
			/>
		}
	}

}

//render event voting system if event.finalized = false;
//render moviedecided information if event.finalized = true;
<<<<<<< HEAD
export default EventPage;
=======
export default Event;
>>>>>>> error resolved
