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
			hasVoted: false,
      event: {},
			eventFinalized: false,
			threeMovies: [
        {
					"_id": "59d52fc9808c0f723595a0fd",
					"title": "The Revenant",
					"poster": "/oXUWEc5i3wYyFnL1Ycu8ppxxPvs.jpg",
					"overview": "In the 1820s, a frontiersman, Hugh Glass, sets out on a path of vengeance against those who left him for dead after a bear mauling.",
					"eventId": "59d52fa7808c0f723595a0fb",
					"votes": 7.3,
					"totalUserVotes": 0,
					"__v": 0,
					"votesByUser": []
        },
        {
					"_id": "59d52fc9808c0f723595a0fe",
					"title": "Blair Witch",
					"poster": "/kqmGs9q5WZkxKub60K6pU37GdvU.jpg",
					"overview": "Students on a camping trip discover something sinister is lurking beyond the trees.",
					"eventId": "59d52fa7808c0f723595a0fb",
					"votes": 4.9,
					"totalUserVotes": 0,
					"__v": 0,
					"votesByUser": []
        },
        {
					"_id": "59d52fc9808c0f723595a0ff",
					"title": "Elf",
					"poster": "/9jChHqqcpe0zHNTqkNqWZkwkgil.jpg",
					"overview": "When young Buddy falls into Santa's gift sack on Christmas Eve, he's transported back to the North Pole and raised as a toy-making elf by Santa's helpers. But as he grows into adulthood, he can't shake the nagging feeling that he doesn't belong. Buddy vows to visit Manhattan and find his real dad, a workaholic publisher.",
					"eventId": "59d52fa7808c0f723595a0fb",
					"votes": 6.4,
					"totalUserVotes": 0,
					"__v": 0,
					"votesByUser": []
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

  componentDidMount() {
		//var eventId = this.props.event;
		//console.log(this.props);
		//this.getEvent(eventId);
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
				<Chat eventId={ this.props.event }/>
			</div>
		)
	}
}

//render event voting system if event.finalized = false;
//render moviedecided information if event.finalized = true;
export default EventPage;
