import React from 'react';
import ReactDOM from 'react-dom';
var $ = require("jquery");
//import SearchResultsDisplay from './searchresultsdisplay';
var axios = require('axios');
import Typeahead from 'typeahead.js';

class Search extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			input: "",
			currentMovie: ""
		}
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e){
		this.setState({input: e.target.value})
	}


	selectMovie(movie){
		this.setState({currentMovie: movie})
	}
	// BLOODHOUND +  TYPE AHEAD
	componentDidMount(){

	var MovieTitles = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: function(data){
	  	Bloodhound.tokenizers.whitespace(data.value);
		},
		local: ['ape, babe, cape, drake']
	  // remote: {
	  // 	url: "https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=d048a770f228472a4201b947da86a0a5",
	  // 	filter: function(movies){
	  // 		return $.map(movies.data, function(data){
	  // 			return {
	  // 				id: data.id,
	  // 				title: data.title
	  // 			}
	  // 		})
	  // 	}
	  // }
	})

	MovieTitles.initialize();

	$('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {source: MovieTitles.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
      this.fetchMovieID(datum.id)
    }.bind(this));
	// $('.typeahead').typeahead({
	//   highlight: true,
	//   hint: true
	// },
	// {
	//   name: 'MovieTitles',
	//   source: MovieTitles
	// })
	// .on('typeahead:selected', function(err, movie) {
	// 	if(err) console.log('ERROR RENDERING MOVIES')
 //    this.selectMovie(movie)
 //  }.bind(this));

	}
	// <SearchResultsDisplay currentMovie={this.state.currentMovie}/>
	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleSearch} className="typeahead" type="text" placeholder="Search for movies..." />
				</form>

			</div>
		)
	}
}

export default Search;
