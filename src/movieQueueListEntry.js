import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
var axios = require('axios');

class MovieQueueListEntry extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);
	}
	handleUpvote(){
		console.log('upvoted');
		axios.post('/upvote')
		.then(function(data){
			console.log(data);
		})
		.catch(function(error){
			console.log(error);
		})
	}
	handleDownvote(){
		console.log('downvoted');
		axios.post('/downvote')
		.then(function(data){
			console.log(data);
		})
		.catch(function(error){
			console.log(error);
		})
	}
	// <SearchResultsDisplay currentMovie={this.state.currentMovie}/> 
	render(){
		return (
			<div>
				{this.props.movie.title}
				<p onClick={this.handleUpvote}>UPVOTE</p>
				<p onClick={this.handleDownvote}>DOWNVOTE</p>
			</div>
		)
	}
}

export default MovieQueueListEntry; 