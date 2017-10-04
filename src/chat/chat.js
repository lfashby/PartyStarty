import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import MessageCreator from './MessageCreator';
import MessagesDisplay from './MessagesDisplay';

const socket = openSocket('http://localhost:3000');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {from: 'me', text: 'hello there'},
        {from: 'someone', text: 'hihi'},
        {from: 'noOne', text: 'hihhhoohohsdfjsdlfj'}
      ]
    }
  }

  sendMessage(msg, from='John Snow') {
    // emit socket event with the message data
    // handle saving that message to the database on
    // the server side
    alert(`Your message is: ${msg}`);
  }

  render() {
    return (
      <div id='chat'>
        <MessageCreator sendMessage={ this.sendMessage }/>
        <MessagesDisplay messages={ this.state.messages } />
      </div>
    );
  }
}

export default Chat;