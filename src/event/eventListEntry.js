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
        {this.props.event.eventTitle}
        <br></br>
        Location: {this.props.event.eventLocation}
        <br></br>
          Date: {this.props.event.eventDate.slice(0, 15)} - {this.props.event.eventTime}
        { this.state.posters.length ? (
          <div>
            <br></br>
            <p>Hosted by: {this.props.event.eventHostName}</p>
            <p>Description: {this.props.event.eventDesc}</p>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[0].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[1].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[2].poster}`} />
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
