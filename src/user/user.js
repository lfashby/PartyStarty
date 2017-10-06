import React from 'react';
import axios from 'axios';
import Navbar from '../navbar.js';
import EventList from '../event/eventList.js';
import { Link } from 'react-router-dom';

class User extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: `error`,
      invited: [],
      going: [],
      hosting: []
    }
  }

  componentDidMount () {
    console.log('StATE', this.state);
    console.log('PROPS', this.props);
    axios({
      method: `GET`,
      url: `/getEvents`
    })
    .then(result => {
      //console.log('user server.js ', result);
      this.setState({
        username: result.data.username || `error user`,
        invited: result.data.invites || [],
        going: result.data.goings || [],
        hosting: result.data.hostings || []
      })
    })
    .then(result => {
      var props = [`invited`,`going`,`hosting`];
      var values = [this.state.invited,this.state.going,this.state.hosting];
      //console.log(this.props)
      this.props.setInviteGoingHosting(props, values);
    })
    .catch(err => {
      console.log('line 26 user.js ', err);
      return;
    })
  }

  render () {
    return (
      <div>
        <div className='userHead'> {this.props.username}'s Profile </div>
        <div className='eventsContainer'>
          <div className='invited'>
            <Link to='invited' className='row' style={{ textDecoration: 'none' }}>
              <button className='eventButtons invitedButton'>See All Invited Events</button>
            </Link>
            <br/>
          </div>

          <div className='going'>
            <Link to='going' className='row' style={{ textDecoration: 'none' }}>
              <button className='eventButtons goingButton'>See All Events I'm Going To</button>
            </Link>
            <br/>
          </div>

          <div className='hosting'>
            <Link to='hosting' className='row' style={{ textDecoration: 'none' }}>
              <button className='eventButtons hostingButton'>See All Events I'm Hosting</button>
            </Link>
            <br/>
          </div>
        </div>
      </div>
    )
  }
}

export default User;






















