import React from 'react';
import Navbar from '../navbar';

const Invite = (props) => (
  <div>
    <Navbar />
    <div className="createpage">
      <h2>Invite your friends</h2>
      <form onSubmit={}>
        <label>Enter username:</label>
        <input className="form-control" type="text" placeholder="Enter username" />
        <input className="btn btn-secondary btn-lg textarea" type="button" value="Add user" />
      </form>
    </div>
  </div>
);

export default Invite;