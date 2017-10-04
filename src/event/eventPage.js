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
			threeMovies: [
				{title: 'hi'}, {title: 'hello'}, {title: 'yes'}
			],
			firstRating: 0,
      secondRating: 0,
      thirdRating: 0
		}
		this.handleFirstRating=this.handleFirstRating.bind(this);
		this.handleSecondRating=this.handleSecondRating.bind(this);
		this.handleThirdRating=this.handleThirdRating.bind(this);
		this.submitRatings=this.submitRatings.bind(this);
  };

	handleFirstRating(e){
		this.setState({firstRating: e.target.value});
	}
	handleSecondRating(e){
		this.setState({secondRating: e.target.value});
	}
	handleThirdRating(e){
		this.setState({thirdRating: e.target.value});
	}

	submitRatings() {
		console.log('submit ratings is getting triggered')
		// axios.post('/create', {
		// 	title: this.state.title, 
		// 	location: this.state.location,
		// 	date: this.state.date,
		// 	time: this.state.time,
		// 	description: this.state.description
		// })
		// .then((response) => {
    //   // console.log('SUCCESS', response.data._id); // Awesome
    //   this.setState({eventId: response.data.id});
		// })
		// .catch((error) => {
		// 	console.log('ERROR', error);
		// })
  }

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
		console.log(this.props);
		const eventFinalized = this.state.eventFinalized;
		let topBox = null;
		if (!eventFinalized) {
			topBox = 
				<EventVoter
					event={this.state.event}
					movies={this.state.threeMovies}
					firstRating={this.state.firstRating}
					secondRating={this.state.secondRating}
					thirdRating={this.state.thirdRating}
					handleFirstRating={this.handleFirstRating}
					handleSecondRating={this.handleSecondRating}
					handleThirdRating={this.handleThirdRating}
					submitRatings={this.submitRatings}
				/>;
		} else {
			topBox = 
				<EventWinnerDisplay 
					event={this.state.event} 
					movies={this.state.threeMovies}
				/>;
		}
		
		return (
			<div>
				{topBox}
				<Chat />
			</div>
		)
	}
}

//render event voting system if event.finalized = false;
//render moviedecided information if event.finalized = true;
export default EventPage;
