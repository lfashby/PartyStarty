import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup';
import Search from './search';
import Create from './eventCreator/create';
import Home from './home';
import User from './user/user.js';
import Navbar from './navbar.js';
import Invited from './user/Invited.js';
import Going from './user/Going.js';
import Hosting from './user/Hosting.js';
import EventPage from './event/eventPage.js';
import createBrowserHistory from '../node_modules/history/createBrowserHistory.js'
import {BrowserRouter, Route, Switch, browserHistory, Redirect, withRouter, Link} from 'react-router-dom';

// const history = createBrowserHistory();
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lookingAtEvent: ``,
      username: '',
      password: '',
      isAuth: false,
      invited: [],
      going: [],
      hosting: [],
      username: '',
      password: ''
    }
    this.setLookingAtEvent = this.setLookingAtEvent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    
    this.setLookingAtEvent = this.setLookingAtEvent.bind(this);
    this.setInviteGoingHosting = this.setInviteGoingHosting.bind(this);
    this.mapOut = this.mapOut.bind(this);
    this.setLookingAtEvent = this.setLookingAtEvent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  setLookingAtEvent (e) {
    // e.preventDefault();
    var event = e.target.value;
    console.log('event' , e.target.value);
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

  setInviteGoingHosting(props, values) {
    this.setState({
      [props[0]]: values[0],
      [props[1]]: values[1],
      [props[2]]: values[2]
    });
  }

  mapOut (type) {
    console.log('working with data ', this.state[type],'this.setLookingAtEvent',this.setLookingAtEvent)
    return (
      <div className='mapOfEvents'>
        {this.state[type].map((event,i) => {
          return (
            <Link to='/eventpage' key={i} style={{fontSize:`180%`}}>
              <button key={i}
              type='button'
              className='goToEvent'
              onClick={this.setLookingAtEvent}
              value={event._id}
              > {event.eventTitle} </button>
              <br/>
            </Link>
          )
        })}
      </div>
    )
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
        <Navbar logout={ this.logout } signedIn={this.state.isAuth}>
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
                <User setLookingAtEvent={this.setLookingAtEvent}
                  setInviteGoingHosting={this.setInviteGoingHosting}/>
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

            <Route path='/userpage' render={() => {
                return <User setLookingAtEvent={this.setLookingAtEvent}
                setInviteGoingHosting={this.setInviteGoingHosting}/>
              }
            }/>
            <Route path='/invited' render={ () => {
                return <Invited 
                  invited={this.state.invited}
                  mapOut={this.mapOut}/>
              }
            }/>
            <Route path='/going' render={ () => {
                return <Going 
                  going={this.state.going}
                  mapOut={this.mapOut}/>
              }
            }/>
            <Route path='/hosting' render={ () => {
                return <Hosting 
                  hosting={this.state.hosting}
                  mapOut={this.mapOut}/>
              }
            }/>

            <Route path="/signin" component={SignIn} />
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
