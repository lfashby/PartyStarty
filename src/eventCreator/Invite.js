import React from 'react';
import Navbar from '../navbar';
import InviteEntry from './InviteEntry.js';
import {Link} from 'react-router-dom';

const Invite = (props) => (
  <div>
    <div className="createpage">
        <h2 className="subH">Invite your friends, if you'd like</h2>
        <form>
        <Link to='/eventpage'>
          <button onClick={props.setLookingAtEvent} value={props.eventId} type="button" className="btn">Finish Creating Event</button>
        </Link>
        </form>
        <form onSubmit={props.handleFriends}>
          <input value={props.friendValue} onChange={props.handleFriendChange} className="form-control" type="text" placeholder="Enter username" />
          <input className="btn btn-secondary btn-lg textarea" type="submit" value="Add user" />
        </form>
      <ul>
        {props.friends.map((friend, i) => {
          return <InviteEntry friend={friend} eventId={props.eventId} key={i} setLookingAtEvent={props.setLookingAtEvent} />
        })}
      </ul>
    </div>
  </div>
);

export default Invite;

// {props.finalEntrySubmit()}
