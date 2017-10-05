import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import EventVoter from './eventVoter.js';
import EventWinnerDisplay from './eventWinnerDisplay.js';
import Chat from '../chat/chat.js'

//receives the eventId through props, nothing else

class EventPage extends React.Component {
	constructor(props){
    super(props);
    this.state = {
			username: '',
			hasVoted: false,
      event: {},
			eventFinalized: false,
			threeMovies: [],
			firstRating: 0,
      secondRating: 0,
      thirdRating: 0
		}
		this.handleFirstRating=this.handleFirstRating.bind(this);
		this.handleSecondRating=this.handleSecondRating.bind(this);
		this.handleThirdRating=this.handleThirdRating.bind(this);
		this.submitRatings=this.submitRatings.bind(this);
		this.getEvent=this.getEvent.bind(this);
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
		var firstMovie = {};
		firstMovie.username = this.state.username;
		firstMovie._id = this.state.threeMovies[0]._id;
		firstMovie.votes = this.state.firstRating;
		
		var secondMovie = {};
		secondMovie.username = this.state.username;
		secondMovie._id = this.state.threeMovies[1]._id;
		secondMovie.votes = this.state.secondRating;
		
		var thirdMovie = {};
		thirdMovie.username = this.state.username;
		thirdMovie._id = this.state.threeMovies[2]._id;
		thirdMovie.votes = this.state.secondRating;
		
		var movies = [];
		movies.push(firstMovie, secondMovie, thirdMovie);
		console.log(movies);
		axios.put('/movies', {movies})
		.then((response) => {
			console.log('voting worked');
		})
		.catch((error) => {
			console.log('ERROR', error);
		})
  }

	getEvent(eventId, username) {
		// console.log('eventid', eventId);
		axios.get('/event/' + eventId)
			.then(res => {
				// console.log('getevent is working', res);
				this.setState({
					username: username,
					threeMovies: res.data.movies,
					event: res.data.event
				})
			})
			.then(res => {
				console.log('username after compdidmount', this.state.username);
			})
			.catch(err => {
				console.log(err);
			})
	}

  componentDidMount() {
		var eventId = this.props.event;
		var username = this.props.username;
		console.log('this.props.event', this.props.event)
		this.getEvent(eventId, username);
  }

	render(){
		console.log('in render', this.state.threeMovies);

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
				<Chat 
					eventId={ this.props.event }
					username={ this.props.username}
				/>
			</div>
		)
	}
}

//render event voting system if event.finalized = false;
//render moviedecided information if event.finalized = true;
export default EventPage;
