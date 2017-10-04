import React from 'react';
import Navbar from '../navbar.js';

class Going extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      
    }
  }
  render () {
    return (
      <div>
        <Navbar />
        <div className='userEvents'>Going To Following Events</div>
        {
          this.props.mapOut(`going`)
        }
      </div>
    )

  }
}

export default Going;