import React from 'react';
import Navbar from '../navbar';
import InviteEntry from './InviteEntry.js';

const Invite = (props) => (
  <div>
    <Navbar />
    <div className="createpage">
      <h2>Invite your friends</h2>
      <form onSubmit={props.handleFriends}>
        <label>Enter username:</label>
        <input value={props.friendValue} onChange={props.handleFriendChange} className="form-control" type="text" placeholder="Enter username" />
        <input className="btn btn-secondary btn-lg textarea" type="submit" value="Add user" />
      </form>
      
      <ul>
        {props.friends.map((friend, i) => {
          return <InviteEntry friend={friend} key={i} />
        })}
      </ul>
    </div>
  </div>
);

export default Invite;


//<Link to="/" className="btn btn-secondary btn-lg textarea">Create Event</Link>
// Set a conditional render from parent comp