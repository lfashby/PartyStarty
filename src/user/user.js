import React from 'react';
import axios from 'axios';
import Navbar from '../navbar.js';
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
    axios({
      method: `GET`,
      url: `/getEvents`
    })
    .then(result => {
      console.log('user server.js ', result);
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
      this.props.setProperty(props, values);
    })
    .catch(err => {
      console.log('line 26 user.js ', err);
      return;
    })
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className='userHead'> {this.state.username}'s Profile </div>
        <div className='invited'>
          <Link to='invited'>
            <div>Invited Events</div>
          </Link>
        </div>

        <div className='going'>
          <Link to='going'>
            <div>Going To Events</div>
          </Link>
        </div>

        <div className='hosting'>
          <Link to='hosting'>
            <div>Hosting Events</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default User;






















