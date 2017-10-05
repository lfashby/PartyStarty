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

grabFilmPoster(index) {
  if (!this.state.posters.length) {
    axios.get('/movies', { params: {eventId: this.props.event._id }})
    .then((results) => {
      this.setState({posters: results.data.movies})
      console.log(this.state);
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
        <li onClick={() => this.grabFilmPoster(this.props.index)}className="list-group-item">
        {this.props.event.eventTitle}
        <br></br>
        {this.props.event.eventDesc}
        </li>
        { this.state.posters.length ? (
          <div>
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[0].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[1].poster}`} />
            <img className="posters" src={`https://image.tmdb.org/t/p/w500${this.state.posters[2].poster}`} />
          </div>
        ):( null )
        }
      </div>
    )

  }
}

export default EventListEntry;