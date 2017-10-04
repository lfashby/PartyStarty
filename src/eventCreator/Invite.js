import React from 'react';
import Navbar from '../navbar';
import InviteEntry from './InviteEntry.js';

const Invite = (props) => (
  <div>
    <div className="createpage">
        <h2 className="subH">Invite your friends</h2>
        {props.renderSubmit()}
        <form onSubmit={props.handleFriends}>
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