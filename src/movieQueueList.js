import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
import SearchResultsDisplay from './searchresultsdisplay';
var axios = require('axios');

class MovieQueueList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	handleUpvote(){
		console.log('upvoted');
	}
	handleDownvote(){
		console.log('downvoted');
	}
	// <SearchResultsDisplay currentMovie={this.state.currentMovie}/> 
	render(){
		return (
			<div>
				{this.props.movies.map( movie => {
					return <div>
						movie.title
						<button onClick={this.handleUpvote}>UPVOTE</button>
						<button onClick={this.handleDownvote}>DOWNVOTE</button>
					</div>
				})}
			</div>
		)
	}
}

export default Search; 