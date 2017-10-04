import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
var axios = require('axios');


// Shift to stateless
const MovieQueueListEntry = (props) => (
	<div className="qEntry">
	  <img className="card-img-list" src={`https://image.tmdb.org/t/p/w500${props.movie.poster}`} />
	</div>
)


export default MovieQueueListEntry;


// <SearchResultsDisplay currentMovie={this.state.currentMovie}/> NOT BEING USED

//OLD UP AND DOWNVOTE CODE
	// handleUpvote(title){
	// 	console.log('upvoted');
	// 	console.log(title);
	// 	axios.post('/upvote', {title: title})
	// 	.then(function(data){
	// 		console.log(data);
	// 	})
	// 	.catch(function(error){
	// 		console.log(error);
	// 	})
	// }
	// handleDownvote(){
	// 	console.log('downvoted');
	// 	axios.post('/downvote')
	// 	.then(function(data){
	// 		console.log(data);
	// 	})
	// 	.catch(function(error){
	// 		console.log(error);
	// 	})
	// }


// <li className="btn btn-secondary btn-sm list-group-item movie-buttons" onClick={this.handleUpvote}>UPVOTE {this.props.movie.upvotes}</li>
// <li className="btn btn-secondary btn-sm list-group- item movie-buttons" onClick={this.handleDownvote}>DOWNVOTE {this.props.movie.downvotes}</li> 
