import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Redirect} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './create';
import Navbar from './navbar';
import EventList from './eventList.js';
var axios = require('axios');

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			events: []
			// currentEvent: events[0]
		}
		this.componentWillMount = this.componentWillMount.bind(this);
	}
	componentWillMount(){
		axios.get('/getEvents')
		.then(data => {
			console.log('have data',data.data[0])
			this.setState({
				events: data.data
			})
			console.log(this.state.events)
		})
		.catch(error => {
			console.log('ERROR retrieving events')
		})
	}
	componentDidMount() {

	}

	componentDidMount(){
		// console.log(util.isLoggedIn);
  	// window.isAuth ? (console.log('Good to go')) : (<Redirect to="/signin"/>); 
	}

	render(){
		return (
			// !this.state.events? <div>Loading</div>:
			<div>
				<Navbar />
			<div className= "EventList"> 
				<EventList events={this.state.events}/>
				</div>
				<Search />
			</div>
		)
	}
	
}

export default Home; 
