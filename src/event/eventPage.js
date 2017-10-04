import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import EventVoter from './eventVoter.js';
import EventWinnerDisplay from './eventWinnerDisplay.js';
import Chat from '../chat.js'

//receives the eventId through props, nothing else

class EventPage extends React.Component {
	constructor(props){
    super(props);
    this.state = {
			hasVoted: false,
      event: {},
			eventFinalized: false,
			threeMovies: [
				{
					title: 'hi',
					eventId: 1,

				}, {
					title: 'hello',
					eventId: 1
				}, {
					title: 'yes',
					eventId: 1
				}
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

	submitRatings(e) {
		e.preventDefault();
		var firstMovie = this.state.threeMovies[0];
		firstMovie.votes = this.state.firstRating;
		var secondMovie = this.state.threeMovies[1];
		secondMovie.votes = this.state.secondRating;
		var thirdMovie = this.state.threeMovies[2];
		thirdMovie.votes = this.state.thirdRating;
		var movies = [];
		movies.push(firstMovie, secondMovie, thirdMovie);

		axios.put('/movies', movies)
		.then((response) => {
			alert('vote sent');
		})
		.catch((error) => {
			console.log('ERROR', error);
		})
  }

	getEvent(eventId) {
		axios.get('/events', {
			params: {
				eventId: eventId 
			}
		})
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
		var eventId = this.props.eventId;
		this.getEvent(eventId);
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
