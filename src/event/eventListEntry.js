import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
var axios = require ('axios');

class EventListEntry extends React.Component {
	constructor(props){
		super(props)
		this.state = {
      posters: []
    }
  }

grabFilmPoster() {
  console.log(this.props);
  if (!this.state.posters.length) {
    axios.get('/movies', { params: {eventId: this.props.event._id }})
    .then((results) => {
      this.setState({posters: results.data.movies})
    })

    .catch((error) => {
      console.log(error);
    })
  } else {
    this.setState({posters: []});
  }
}

  render() {
    return (
      <div className="video-list-entry">
        <li onClick={() => this.grabFilmPoster()} className="list-group-item">
        <h4 className="homeText">{this.props.event.eventTitle}</h4>
        <p className="homeText">Location: {this.props.event.eventLocation}</p>
        <p className="homeText">Date: {this.props.event.eventDate.slice(0, 15)} - {this.props.event.eventTime}</p>
        { this.state.posters.length ? (
          <div className="postersContainer">
            <p className="homeText">Hosted by: {this.props.event.eventHostName}</p>
            <p className="homeText">Description: {this.props.event.eventDesc}</p>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[0].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[1].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[2].poster}`} />
            <br></br>
            <Link to='/eventpage'>
              <button onClick={this.props.setLookingAtEvent} value={this.props.event._id} type="button" className="btn">Checkout the Event</button>
            </Link>
          </div>
        ):( null )
        }
        </li>
      </div>
    )

  }
}

export default EventListEntry;
