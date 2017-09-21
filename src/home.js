import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Redirect} from 'react-router-dom';
import Search from './search';
import SignIn from './signin';
import SignUp from './signup';
import Create from './create';
import Navbar from './navbar';
// var util = require ('../lib/utility')
var axios = require('axios');
class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			// events: [],
			// currentEvent: events[0]
		}
	}

	componentDidMount(){
		// console.log(util.isLoggedIn);
  	// window.isAuth ? (console.log('Good to go')) : (<Redirect to="/signin"/>); 
	}

	render(){
		return (
			<div>

				<Navbar />
				<h4 id="home">HOME SCREEN</h4>
				<Search />
			</div>
		)
	}
}

export default Home; 
