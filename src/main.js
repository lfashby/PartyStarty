import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup';
import Search from './search';
import Create from './eventCreator/create';
import Home from './home';
import User from './user/user.js';
import EventPage from './event/eventPage.js';
import createBrowserHistory from '../node_modules/history/createBrowserHistory.js'
import {BrowserRouter, Route, Switch, browserHistory, Redirect} from 'react-router-dom';

// const history = createBrowserHistory();
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lookingAtEvent: ``
    }
  }

  setLookingAtEvent (event) {
    this.setState({
      lookingAtEvent: event
    })
  }

  render(){
    return (
      <BrowserRouter basename='/#' >
        <Switch>
            <Route exact path="/" render={() => (
              isAuth ? (
                <Redirect to="/home"/>
              ) : (
                <Redirect to="/signin"/>
              )
            )}/>
            <Route exact path="/home" render={() => (
              isAuth ? 
                <Home /> : (
                <Redirect to="/signin"/>
              )
            )}/>
            <Route path="/home" component={Home}/>
            <Route path='/userpage' component={User}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={Create}/>
            <Route path="/search" component={Search} />
            <Route path="/eventpage" render={() => {
              return <EventPage event={this.state.lookingAtEvent}/>
            }} />
            <Route path="*" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

window.isAuth = false;
// function checkAuth() {
//   console.log('checked Auth')
//   return setTimeout(()=> isAuth, 1000);
// }

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    (<App />),
    document.getElementById('mount')
  );
});
