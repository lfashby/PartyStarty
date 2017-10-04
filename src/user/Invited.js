import React from 'react';
import Navbar from '../navbar.js';
import { Link } from 'react-router-dom';

class Invited extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    }
  }
  render () {
    return (
      <div>
        <Navbar />
        <div className='userEvents'>Invited To Following Events</div>
        {
          this.props.mapOut(`invited`)
        }
      </div>
    )
  }
}

export default Invited;