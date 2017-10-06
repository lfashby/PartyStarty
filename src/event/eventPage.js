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
			finalMovie: {},
			threeMovies: [],
			firstRating: 0,
      secondRating: 0,
			thirdRating: 0,
			justVoted: false,
			foods: []
		}
		this.handleFirstRating=this.handleFirstRating.bind(this);
		this.handleSecondRating=this.handleSecondRating.bind(this);
		this.handleThirdRating=this.handleThirdRating.bind(this);
		this.submitRatings=this.submitRatings.bind(this);
		this.getEvent=this.getEvent.bind(this);
  };

	handleFirstRating(e){
		var firstRating = Number(e.target.value);
		this.setState({firstRating: firstRating});
	}
	handleSecondRating(e){
		var secondRating = Number(e.target.value);
		this.setState({secondRating: secondRating});
	}
	handleThirdRating(e){
		var thirdRating = Number(e.target.value);
		this.setState({thirdRating: thirdRating});
	}

	submitRatings(e) {
		e.preventDefault();
		let total = this.state.firstRating + this.state.secondRating + this.state.thirdRating;
		console.log(total);
		if (total > 10) {
			alert('Too Many Points. Distribute only 10 Points');
			return; 
		}
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
		thirdMovie.votes = this.state.thirdRating;
		
		var movies = [];
		movies.push(firstMovie, secondMovie, thirdMovie);
		console.log(movies);
		axios.put('/movies', {movies})
		.then((response) => {
			this.setState({
				firstRating: 0,
				secondRating: 0,
				thirdRating: 0,
				justVoted: true
			})
		})
		.then(res => {
			setTimeout(() => {
				this.setState({
					justVoted: false
				})
			}, 5000)
		})
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
					event: res.data.event,
					eventFinalized: res.data.event.eventFinalized,
					foods: res.data.foods
				})
				return res;
			})
			.then(res => {
				var finalMovie = this.state.threeMovies.filter((movie) => {
					return res.data.event.finalMovieId === movie._id;
				})
				finalMovie = finalMovie[0];
				this.setState({
					finalMovie: finalMovie
				})
				return res;
			})
			.then(res => {
				axios.get('/recipes')
			})
			.catch(err => {
				console.log(err);
			})
	}

  componentDidMount() {
		var eventId = this.props.event;
		var username = this.props.username;
		this.getEvent(eventId, username);
  }

	render(){
		console.log('in render, justVoted', this.state.justVoted);

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
					justVoted={this.state.justVoted}
					foods={this.state.foods}
				/>;
		} else {
			topBox = 
				<EventWinnerDisplay 
					event={this.state.event} 
					finalMovie={this.state.finalMovie}
					foods={this.state.foods}
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
