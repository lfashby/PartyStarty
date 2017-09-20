import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup';
import Search from './search';
import Create from './create';
import Home from './home'
import {BrowserRouter, Route, Switch} from 'react-router-dom';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
        <div>
        </div>
    )
  }
}


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Router>
					<Route Path="/" component={Home}/>
					<Route Path="/signin" component={SignIn} />
					<Route Path="/signup" component={SignUp} />
					<Route Path="/create" component={Create}/>
					<Route Path="/search" component={Search} />

		</Router>,
    document.getElementById('mount')
  );
});


// <Route Path="/search_results" component={SearchResults} />
