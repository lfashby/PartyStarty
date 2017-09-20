import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
var axios = require('axios');

class Create extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			title: "",
			location: "",
			time: "",
			description: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleLocation = this.handleLocation.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
	}

	handleSubmit(){
		axios.post('/create', {
			title: this.state.title, 
			location: this.state.location,
			time: this.state.time,
			description: this.state.description
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	handleTitle(e){
		this.setState({title: e.target.value});
	}

	handleLocation(e){
		this.setState({location: e.target.value});
	}

	handleTime(e){
		this.setState({time: e.target.value});
	}

	handleDescription(e){
		this.setState({description: e.target.value});
	}

	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleTitle} type="text" defaultValue="Title" />
					<input onChange={this.handleLocation} type="text"/>
					<input onChange={this.handleTime} type="time"/>
					<input onChange={this.handleDescription} type="text" defaultValue="description" />
					<br></br>
					<p>Create Movie Queue</p>
					<Search />
					<br></br>
					<input type="submit" value="Create Event"/>
				</form>
				<button>Sign Up</button>
			</div>
		)
	}
}

export default Create; 