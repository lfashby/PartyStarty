import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
//import SearchResultsDisplay from './searchresultsdisplay';
var axios = require('axios');
import Typeahead from 'typeahead.js';
import Bloodhound from 'typeahead.js';

class Search extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			input: "bo",
			currentMovie: ""
		}
		this.handleSearch = this.handleSearch.bind(this);
	}
	
	handleSearch(e){ 
		this.setState({input: e.target.value});
	}


	selectMovie(movie){
		this.setState({currentMovie: movie});
		$('.typeahead').val(movie.value);
	}

	clearSearch(e){
		e.target.value = ''
	}
	// BLOODHOUND +  TYPE AHEAD
	componentDidMount(){
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
	  				value: data.title,
	  				id: data.id
	  			}
	  		})
	  	}
	  }	
	})

	MovieTitles.initialize();

	$('.typeahead').typeahead({
	  highlight: true,
	  hint: true
	},
	{
	  name: 'MovieTitles',
	  source: MovieTitles.ttAdapter(),
	  templates: {
	  	suggestion: function(data){
	  		return '<p>' + data.value + '</p>'
	  	}
	  }
	})
	.on('typeahead:selected', function(err, movie) {
		if(err) console.log('ERROR RENDERING MOVIES')
    this.selectMovie(movie)
  }.bind(this));
	
	}
	// <SearchResultsDisplay currentMovie={this.state.currentMovie}/>
	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleSearch} onClick={this.clearSearch} className="typeahead searchForm" type="text" placeholder="Search for movies..." />
				</form>
				<p>{this.state.currentMovie.value}</p>
			</div>
		)
	}
}

export default Search;
