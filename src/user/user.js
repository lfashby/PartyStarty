import React from 'react';
import axios from 'axios';

class User extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      invited: 
      going: 
      hosting: 
    }
  }

  componentDidMount () {
    axios({
      method: `GET`,
      url: `/getEvents`
    })
    .then(result => {
      this.setState({
        invited: result.invites,
        going: result.goings,
        hosting: result.hostings
      })
    })
    .catch(err => {
      console.log('line 26 user.js ', err);
      return;
    })
  }

  render () {
    function mapOut(type) {
      return (
      <div>
        {this.state[type].map((event,i) => {
          return (
            <div key={i}> event.eventTitle </div>
          )
        })}
      </div>)
    }


    return (
      <div>
        <div className='invited'>
          <div>Invited Events</div>
          {mapOut('invited')}
        </div>

        <div className='going'>
          <div>Going To Events</div>
          {mapOut('going')}
        </div>

        <div className='hosting'>
          <div>Hosting Events</div>
          {mapOut('hosting')}
        </div>
      </div>
    )
  }
}

export default User;






















