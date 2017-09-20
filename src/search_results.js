import React from 'react';
import ReactDOM from 'react-dom';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
    // handle adding movies to queue from results display
    this.handleAddMovietoQueue = this.handleAddMovietoQueue.bind(this);
  }

  // buld func to add movie to queue
  handleAddMovietoQueue() {
    this.setState({movies: this.state.movies.push(this.props.currentMovie)});
  };

// render results with add button on page
  render() {
    return (
      <div>
        <div>
          <h3>{this.props.title}</h3>
            <div>{this.props.poster_path}</div>
            <button onClick={this.handleAddMovietoQueue}>Add to queue</button>
            <div>{this.props.tagline}</div>
            <div>{this.props.overview}</div>
            <div>Length: {this.props.runtime}</div>
            <div>Voting: {this.props.vote}</div>
        </div>
      </div>
    );
  }
}


export default SearchResults;
