import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
import MovieQueueList from './movieQueueList';
var axios = require('axios');
import Typeahead from 'typeahead.js';
import Bloodhound from 'typeahead.js';

class Search extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			input: "",
			currentMovie: {title: "A Bug's Life", id: 9487, poster: "/u9qGMRwcPwP0WETxulS5hKUsEum.jpg", overview: "On behalf of \"oppressed bugs everywhere,\" an inventive ant named Flik hires a troupe of warrior bugs to defend his bustling colony from a horde of freeloading grasshoppers led by the evil-minded Hopper.", votes: 6.8},
			movies: []
		}
		this.handleSearch = this.handleSearch.bind(this);
		this.selectMovie = this.selectMovie.bind(this);
		this.handleAddMovieToQueue = this.handleAddMovieToQueue.bind(this);
	}

	// Handles changing inputs in search form
	handleSearch(e){ 
		this.setState({input: e.target.value});
	}

	// Handles picking a movie from suggestions
	selectMovie(movie){
		this.setState({currentMovie: movie});
		$('.typeahead').val(movie.value);
		console.log(this.state.currentMovie);
	}

	// Resets search form on click
	clearSearch(e){
		e.target.value = ''
	}

	// Adds movie to queue 
	handleAddMovieToQueue() {
    this.setState({movies: this.state.movies.concat([this.props.currentMovie])});
    console.log(this.state.movies);
  };

	componentDidMount(){
		//BLOOD HOUND
	var MovieTitles = new Bloodhound({
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  datumTokenizer: function(data){
	  	Bloodhound.tokenizers.whitespace(data.value);
		},
	  remote: {
	  	url: 'https://api.themoviedb.org/3/search/movie?api_key=d048a770f228472a4201b947da86a0a5&query=%QUERY',
	  	wildcard: '%QUERY',
	  	filter: function(movies){
	  		return $.map(movies.results, function(data){
	  			return {
	  				title: data.title,
	  				id: data.id,
	  				poster: data.poster_path,
	  				overview: data.overview,
	  				votes: data.vote_average,
	  				date: data.release_date
	  			}
	  		})
	  	}
	  }	
	})
	MovieTitles.initialize();
		//TYPE AHEAD
	$('.typeahead').typeahead({
	  highlight: true,
	  hint: true
	},
	{
	  name: 'MovieTitles',
	  source: MovieTitles.ttAdapter(),
	  templates: {
	  	suggestion: function(data){
	  		return '<p>' + data.title + '</p>'
	  	}
	  }
	})
	.on('typeahead:selected', function(err, movie) {
		if(err) console.log('ERROR RENDERING MOVIES')
    this.selectMovie(movie)
  }.bind(this));
	
	}

	//RENDER
	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleSearch} onClick={this.clearSearch} className="typeahead searchForm" type="text" placeholder="Search for movies..." />
				</form>
				<h3>{this.state.currentMovie.title}</h3>
				<img src={`https://image.tmdb.org/t/p/w500${this.state.currentMovie.poster}`} />
				<p>{this.state.currentMovie.overview}</p>
				<p>Release Date</p>	
				<p>{this.state.currentMovie.date}</p>
				<p>Average Score</p>
				<p>{this.state.currentMovie.votes}</p>
				<button onClick={this.handleAddMovieToQueue}> ADD TO QUEUE </button>
				<br></br>
				<MovieQueueList movies={this.state.movies}/>
			</div>
		)
	}
}

export default Search;
