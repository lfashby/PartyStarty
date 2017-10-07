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
  if (this.state.posters && !this.state.posters.length) {
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
        <p className="homeText"><img src="/glyphicons-21-home.png"/>  {this.props.event.eventLocation}</p>
        <p className="homeText"><img src="/glyphicons-46-calendar.png"/>  {this.props.event.eventDate.slice(0, 15)} - {this.props.event.eventTime}</p>
        { this.state.posters ? (
          <div className={this.state.posters.length ? "postersContainer" : "openPostersContainer"}>
            { this.state.posters.length ? (
              <div>
                <p className="homeText"><img src="/glyphicons-4-user.png"/>  Hosted by: {this.props.event.eventHostName}</p>
                <p className="homeText"><img src="/glyphicons-248-note.png"/>  {this.props.event.eventDesc}</p>
              </div>
              ) : (null)
            }
            { this.state.posters.filter((post, i) => i < 3).map((poster, i) => (
              <img key={poster.poster + i} className="posters" src={`https://image.tmdb.org/t/p/w500${poster.poster}`} />
            )) }
            <br></br>
            <Link to='/eventpage'>
              <button onClick={this.props.setLookingAtEvent} value={this.props.event._id} type="button" className="btn btn-secondary">Checkout the Event</button>
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
