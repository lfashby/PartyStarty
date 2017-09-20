import React from 'react';
import ReactDOM from 'react-dom';

var SearchResultsDisplay = (props) => (

render() {

  let apiData = this.props.data

  // identify each piece of response obj:
  // data.title
  // data.description
  // data.poster

  // handle conditions if data ins't avail for the above ^
  return (
    <div className="results-display">
    <div className="results-display-details">
    <h3>{props.data.title}</h3>
    <div>{data.tagline}</div>
    <div>{props.data.overview}</div>
    <div>Length:{props.data.runtime}</div>
    <div>Voting:{props.data.vote}</div>
    <div>{props.data.poster_path}</div>
    </div>
    </div>
  );
}



module.exports = SearchResultsDisplay;

// !--
// need a handleSearchResultsEntryTitleClick func in search component
