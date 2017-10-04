import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './signin';
import SignUp from './signup';
import Search from './search';
import Create from './eventCreator/create';
import Home from './home';
import User from './user/user.js';
import Invited from './user/Invited.js';
import going from './user/Going.js';
import hosting from './user/Hosting.js';
import EventPage from './event/eventPage.js';
import createBrowserHistory from '../node_modules/history/createBrowserHistory.js'
import {BrowserRouter, Route, Switch, browserHistory, Redirect} from 'react-router-dom';

// const history = createBrowserHistory();
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lookingAtEvent: ``,
      invited: [],
      going: [],
      hosting: []
    }
    this.setLookingAtEvent = this.setLookingAtEvent.bind(this);
    this.setInviteGoingHosting = this.setInviteGoingHosting.bind(this);
    this.mapOut = this.mapOut.bind(this);
  }

  setLookingAtEvent (e) {
    e.preventDefault();
    var event = e.target.value;
    this.setState({
      lookingAtEvent: event
    })
  }

  setInviteGoingHosting (props, values) {
    this.setState({
      [props[0]]: values[0],
      [props[1]]: values[1],
      [props[2]]: values[2]
    })
  }

  mapOut (type) {
    return (
    <div>
      {this.state[type].map((event,i) => {
        return (
          <Link to='eventpage'>
            <div key={i}
            onClick={this.setLookAtEvent}
            value={event.eventTitle}> event.eventTitle </div>
          </Link>
        )
      })}
    </div>)
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

            <Route path='/userpage' render={() => {
                return <User setLookingAtEvent={this.setLookingAtEvent}
                setProperty={this.setProperty}/>
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
