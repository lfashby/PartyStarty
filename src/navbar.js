import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './eventCreator/create';
import EventPage from './event/eventPage.js';
var axios = require('axios');

class Navbar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			// events: [],
			// currentEvent: events[0]
		}
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	handleSignOut(){
		axios.get('/logout')
		.then((data) => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		}) 
		console.log('clicked')
		window.isAuth = false;
	}

	render(){
		return (
			<div>
				<div className="navbar navbar-expand-lg navbar-dark bg-dark" >
				<Link to="/" style={{textDecoration: 'none' }} className="nav-brand" id="title">Greenfield</Link>
				
				<Link to='/userpage' style={{textDecoration: 'none' }} className="Link nav-link h4">User Profile</Link>

				<Link to="/signup" style={{textDecoration: 'none' }} className="Link nav-link h4">Sign Up</Link>
			
				<Link to="/signin" style={{textDecoration: 'none' }} className="Link nav-link h4">Sign In</Link>
				
				<Link to="/create" style={{textDecoration: 'none' }} className="Link nav-link h4">Create</Link>

				<Link to="/signin" style={{textDecoration: 'none' }} className="Link nav-link h4" id="logout" onClick={this.handleSignOut} >Sign Out</Link>
				
				<Link to="/eventpage" style={{textDecoration: 'none' }} className="Link nav-link h4">EventPage</Link>
				</div>
			</div>
		)
	}
}

export default Navbar; 
