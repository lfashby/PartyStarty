import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../search';
import Navbar from '../navbar';
import {Link} from 'react-router-dom';
import Home from '../home'
import EntryDetails from './EntryDetails.js';
import Invite from './Invite.js'
import axios from 'axios';

class Create extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			title: "",
			location: "",
			date: "",
			time: "",
      description: "",
      entryDataSubmitted: false,
      filmsAdded: false,
      filmsFinalized: false,
      eventId: '',
      friendValue: '',
      friends: []
		}
		this.handleTitle = this.handleTitle.bind(this);
		this.handleLocation = this.handleLocation.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleTime = this.handleTime.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.addFilmsSubmit = this.addFilmsSubmit.bind(this);
    this.handleFinalizedFilms = this.handleFinalizedFilms.bind(this);
    this.handleFriends = this.handleFriends.bind(this);
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.renderSubmit = this.renderSubmit.bind(this);
	}

	handleTitle(e){
		this.setState({title: e.target.value});
	}

	handleLocation(e){
		this.setState({location: e.target.value});
	}

	handleDate(e){
		this.setState({date: e.target.value});
	}

	handleTime(e){
		this.setState({time: e.target.value});
	}

	handleDescription(e){
		this.setState({description: e.target.value});
  }
  
  submitEntryData(){
    this.setState({entryDataSubmitted: true});
  }

  // Send entry details to server.
  addFilmsSubmit() {
    this.setState({filmsAdded: true});
		axios.post('/create', {
			title: this.state.title, 
			location: this.state.location,
			date: this.state.date,
			time: this.state.time,
			description: this.state.description
		})
		.then((response) => {
      // console.log('SUCCESS', response.data._id); // Awesome
      this.setState({eventId: response.data.id});
		})
		.catch((error) => {
			console.log('ERROR', error);
		})
  }

  handleFinalizedFilms(movies) {
    this.setState({filmsFinalized: true});
    console.log(movies); // Send movies to colin
		axios.post('/addMovies', {
      movies: movies,
      eventId: this.state.eventId
    })
    .then((response) => {
      console.log('Films sent');
    })
    .catch((error) => {
      console.log('Error sending films to db', error);
    })
  }

  handleFriendChange(event) {
    this.setState({friendValue: event.target.value});
  }

  handleFriends(e) {
    e.preventDefault();
    // Send friendValue to Collin
    axios.post('/invite', {
      invitedUserName: this.state.friendValue,
      eventId: this.state.eventId,
      eventTitle: this.state.title
      // Host username picked up on other side
    })
    .then((response) => {
      console.log('Invite sent to db successfully', response);
    })
    .catch((error) => {
      console.log('Error sending invite', error)
    })
    this.setState({
      friends: [...this.state.friends, this.state.friendValue],
      friendValue: ''
    })
  }

  renderStuff() { // CHANGE NAME
    if (!this.state.filmsAdded) {
      return <EntryDetails 
      handleTitle={this.handleTitle}
      handleLocation={this.handleLocation}
      handleDate={this.handleDate}
      handleTime={this.handleTime}
      handleDescription={this.handleDescription}
      addFilmsSubmit={this.addFilmsSubmit}
      />
    } else if (!this.state.filmsFinalized) {
      return <Search handleFinalized={this.handleFinalizedFilms} />;
    } else {
      return <Invite 
      handleFriends={this.handleFriends}
      friendValue={this.state.friendValue}
      handleFriendChange={this.handleFriendChange}
      friends={this.state.friends}
      renderSubmit={this.renderSubmit}

      /> 
    }
  }

  renderSubmit() {
    if (this.state.friends.length !== 0) {
      return <Link to="/" className="btnSub btn-secondary btn-lg textarea">Finish Creating Event</Link> // Add some styles to this
    }
  }

	render(){
		return (
      <div>
        {this.renderStuff()}
      </div>
    )
	}
}

export default Create;