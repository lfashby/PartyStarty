import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../search';
import Navbar from '../navbar';
import {Link} from 'react-router-dom';
import Home from '../home'
import EntryDetails from './entryDetails.js';
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
      eventId: ''
		}
		this.handleTitle = this.handleTitle.bind(this);
		this.handleLocation = this.handleLocation.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleTime = this.handleTime.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.addFilmsSubmit = this.addFilmsSubmit.bind(this);
    this.handleFinalizedFilms = this.handleFinalizedFilms.bind(this);
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
      return <p>ADD YOUR FRIENDS</p> // And then send their personal information to the database
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
// 	<Link to="/" onClick={this.handleSubmit} className="btn btn-secondary btn-lg textarea">Create Event</Link>
export default Create;