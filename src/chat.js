import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='chat'>
        Chat Component!
      </div>
    );
  }
}

export default Chat;