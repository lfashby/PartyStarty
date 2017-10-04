import React from 'react';
import ReactDOM from 'react-dom';
import {Link, withRouter} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './eventCreator/create';
import EventPage from './event/eventPage.js';
var axios = require('axios');

class Navbar extends React.Component {
	constructor(props){
		super(props)
		this.state = {};
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.logout();
		axios.get('/logout')
		.then((data) => {
			console.log(data);
			this.props.history.push('/signin');
		})
		.catch(error => {
			console.log(error);
		}) 
		console.log('clicked!');
	}

	render(){
		return (
			<div>
				<div className="navbar navbar-expand-lg navbar-dark bg-dark" >
				<Link to="/" style={{textDecoration: 'none' }} className="nav-brand" id="title">Greenfield</Link>
				
				<Link to='/userpage' style={{textDecoration: 'none' }} className="Link nav-link h4">User Profile</Link>

				{
					this.props.signedIn ? null :
					<Link to="/signin" style={{textDecoration: 'none' }} className="Link nav-link h4">Sign In</Link>
				}
				{
					this.props.signedIn ? null :
					<Link to="/signup" style={{textDecoration: 'none' }} className="Link nav-link h4">Sign Up</Link>
				}
				
				<Link to="/create" style={{textDecoration: 'none' }} className="Link nav-link h4">Create</Link>

				<Link to="/signin" style={{textDecoration: 'none' }} className="Link nav-link h4" id="logout" onClick={ this.handleLogout }>Sign Out</Link>
				
				<Link to="/eventpage" style={{textDecoration: 'none' }} className="Link nav-link h4">EventPage</Link>
				</div>
				{ this.props.children }
			</div>
		)
	}
}

export default withRouter(Navbar); 
