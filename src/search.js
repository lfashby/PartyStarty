import React from 'react';
import ReactDOM from 'react-dom';
//import SearchResultsDisplay from './searchresultsdisplay';
var axios = require('axios');
var Typeahead = require('typeahead');
var Bloodhound = require('bloodhound-js')

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
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  remote: {
	  	url: "API_URL"
	  	// filter: function(movies){
	  	// 	return $.map(movies.data, function(data){
	  	// 		return {
	  	// 			id: data.id,
	  	// 			title: data.title
	  	// 		}
	  	// 	})
	  }
	})

	$('.typeahead').typeahead({
	  highlight: true,
	  hint: true
	},
	{
	  name: 'MovieTitles',
	  source: MovieTitles
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
					<input onChange={this.handleSearch} type="text" defaultValue="Search for movies..." />
				</form>
				
			</div>
		)
	}
}

export default Search; 