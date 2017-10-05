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
        {this.props.event.eventTitle}
        <br></br>
        Location: {this.props.event.eventLocation}
        { this.state.posters.length ? (
          <div>
            <p>Hosted by: {this.props.event.eventHostName}</p>
            <p>Description: {this.props.event.eventDesc}</p>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[0].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[1].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[2].poster}`} />
          </div>
        ):( null )
        }
        </li>
      </div>
    )

  }
}

export default EventListEntry;