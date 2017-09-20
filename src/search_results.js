import React from 'react';
import ReactDOM from 'react-dom';

class SearchResults extends React.component {
  constructor(props) {
      super(props);

      // need to add movies to queue from results display
      this.handleAddMoviestoQueue = this.handleAddMoviestoQueue.bind(this);
    }

// buld func to add movie to queue

// render results with add button on page
  render() {
    return (
      <div>
        <div>
        <h3>{currentMovie.title}</h3>
          <div>{currentMovie.poster_path}</div>
          <button>Add to queue</button>
          <div>{currentMovie.tagline}</div>
          <div>{currentMovie.overview}</div>
          <div>Length: {currentMovie.runtime}</div>
          <div>Voting: {currentMovie.vote}</div>
        </div>
      </div>
    );
  }
}



module.exports = SearchResultsDisplay;
