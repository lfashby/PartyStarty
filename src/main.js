import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup';
import Search from './search';
import Create from './eventCreator/create';
import Home from './home';
import User from './user/user.js';
import Navbar from './navbar.js';
import EventPage from './event/eventPage.js';
import createBrowserHistory from '../node_modules/history/createBrowserHistory.js'
import {BrowserRouter, Route, Switch, browserHistory, Redirect, withRouter} from 'react-router-dom';

// const history = createBrowserHistory();
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lookingAtEvent: ``,
      username: '',
      password: '',
      isAuth: false
    }
    this.setLookingAtEvent = this.setLookingAtEvent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  setLookingAtEvent (e) {
    e.preventDefault();
    var event = e.target.value;
    this.setState({
      lookingAtEvent: event
    })
  }

  login(username, password) {
    this.setState({
      username,
      password,
      isAuth: true
    });
  }

  logout() {
    this.setState({
      isAuth: false
    });
  }

  render(){
    return (
      <BrowserRouter basename='/#' >
        <Navbar logout={ this.logout } >
        <Switch>
            <Route exact path="/" render={() => (
              this.state.isAuth ? (
                <Redirect to="/home"/>
              ) : (
                <Redirect to="/signin"/>
              )
            )}/>
            <Route exact path="/home" render={() => (
              this.state.isAuth ? (
                <Home /> 
              ) : (
                <Redirect to="/signin"/>
              )
            )}/>
            <Route exact path="/create" render={() => (
              this.state.isAuth ? (
                <Create /> 
              ) : (
                <Redirect to="/signin"/>
              )
            )}/>
            <Route path='/userpage' render={() => (
              this.state.isAuth ? (
                <User setLookingAtEvent={this.setLookingAtEvent}/>
              ) : (
                <Redirect to="/signin" />
              )
            )}/>
            <Route path="/eventpage" render={() => (
              this.state.isAuth ?
              <EventPage event={this.state.lookingAtEvent}/> :
              <Redirect to="/signin" />
            )} />
            <Route path="/signin" render={() => (
              <SignIn login={ this.login } />
            )} />
            <Route path="/home" component={Home}/>
            <Route path="/signup" component={SignUp} />
            <Route path="*" component={Home} />
        </Switch>
      </Navbar>
      </BrowserRouter>
    )
  }
}
ReactDOM.render(
  (<App/>),
  document.getElementById('mount')
);
