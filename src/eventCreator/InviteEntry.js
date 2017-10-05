import React from 'react';
import axios from 'axios';

class InviteEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invited: true
    }
    this.uninvite = this.uninvite.bind(this);
  }

  uninvite() {
    this.setState({invited: false});
    console.log(this.props)
    axios.delete('/invite', { data: { username: this.props.friend, eventId: this.props.eventId } })
    .then((response) => {
      console.log('dELETE', response);
    })
    .catch((error) => {
      console.log('Uninvite fail', error)
    })
  }

  render() {
    return (
      <div>
        { this.state.invited ? (
          <li>
          {this.props.friend}
          <button onClick={this.uninvite} type="button" className="btn">Uninvite</button>
        </li>
        ) : (null)}
      </div>

    );
  }
}


export default InviteEntry;



// console.log(this.props);
// date
// :
// "2017-01-01"
// description
// :
// "dsfg"
// entryDataSubmitted
// :
// false
// eventId
// :
// "59d68eeb32c1792f27e21fc5"
// filmsAdded
// :
// true
// filmsFinalized
// :
// true
// friendValue
// :
// ""
// friends
// :
// ["dust"]
// location
// :
// "l"
// public
// :
// false
// time
// :
// "01:00"
// title
// :
// "l"