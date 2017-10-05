import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../search';
import Navbar from '../navbar';
import {Switch, Link, Route, Redirect, withRouter} from 'react-router-dom';
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
      friends: [],
      public: false
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
    this.finalEntrySubmit = this.finalEntrySubmit.bind(this);
    this.isPublic = this.isPublic.bind(this);
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
  addFilmsSubmit(e) {
    e.preventDefault();
    if (this.checkEntryDetails(this.state)) {  
      axios.post('/create', {
        title: this.state.title, 
        location: this.state.location,
        date: this.state.date,
        time: this.state.time,
        description: this.state.description,
        public: this.state.public
      })
      .then((response) => {
        // console.log('SUCCESS', response.data._id); // Awesome
        this.setState({eventId: response.data._id});
        this.setState({filmsAdded: true});
      })
      .catch((error) => {
        console.log('ERROR', error);
      })
    } 
  }

  checkEntryDetails(field) {
    var check = true;
    if (field.title === '') {
      alert('Please enter a title.');
      return check = false;
    }
    if (field.location === '') {
      alert('Please enter a location.');
      return check = false;
    }
    if (field.date === '') {
      alert('Please enter a date.');
      return check = false;
    }
    if (field.time === '') {
      alert('Please enter a time.');
      return check = false;
    }
    if (field.description === '') {
      alert('Please enter a description.');
      return check = false;
    }
    return check;
  }

  handleFinalizedFilms(movies) {
    this.setState({filmsFinalized: true});
		axios.post('/addMovies', {
      movies: movies,
      eventId: this.state.eventId
    })
    .then((response) => {
      // console.log('Films sent');
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
    axios.post('/invite', {
      invitedUserName: this.state.friendValue,
      eventId: this.state.eventId,
      eventTitle: this.state.title
    })
    .then((response) => {
      if (response.data === 'error') {
        alert('That username does not exist!');
        this.setState({friendValue: ''});
      } else {
        this.setState({
          friends: [...this.state.friends, this.state.friendValue],
          friendValue: ''
        });
      }
    })
    .catch((error) => {
      console.log('Error sending invite', error)
    })

  }

  finalEntrySubmit(e) {
    e.preventDefault();
    if (this.state.friends.length === 0) {
      if (confirm('Are you sure you don\'t want to add any friends?\n Click Ok to create the Event without adding friends.')) {
        alert('Event created!');
        this.props.history.push('/home');        
      }
    } else {
      this.props.history.push('/home');
    }
  }


  isPublic() {
    this.setState({public: !this.state.public}) // Will need an if
  }

  renderViews() { // CHANGE NAME
    if (!this.state.filmsAdded) {
      return <EntryDetails 
      handleTitle={this.handleTitle}
      handleLocation={this.handleLocation}
      handleDate={this.handleDate}
      handleTime={this.handleTime}
      handleDescription={this.handleDescription}
      addFilmsSubmit={this.addFilmsSubmit}
      public={this.state.public}
      isPublic={this.isPublic}
      />
    } else if (!this.state.filmsFinalized) {
      return <Search handleFinalized={this.handleFinalizedFilms} />;
    } else {
      return <Invite 
      handleFriends={this.handleFriends}
      friendValue={this.state.friendValue}
      handleFriendChange={this.handleFriendChange}
      friends={this.state.friends}
      finalEntrySubmit={this.finalEntrySubmit}
      /> 
    }
  }

	render(){
		return (
      <div>
        {this.renderViews()}
      </div>
    )
	}
}

export default withRouter(Create);