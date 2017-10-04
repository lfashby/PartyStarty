import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import MessageCreator from './MessageCreator';
import MessagesDisplay from './MessagesDisplay';

const socket = openSocket('http://localhost:3000');

const listenToMessages = (event, cb) => {
  socket.on(event, cb);
};

const emitMessage = (event, msg) => {
  socket.emit(event, msg);
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {from: 'me', text: 'hello there'},
        {from: 'someone', text: 'hihi'},
        {from: 'noOne', text: 'hihhhoohohsdfjsdlfj'}
      ]
    };
    listenToMessages(this.state.eventId, (msg) => {
      messages: [msg, ...this.state.messages]
    });
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(msg, from='John Snow') {
    // emit socket event with the message data
    // handle saving that message to the database on
    // the server side
    console.log(this.props);
    emitMessage('chat', {
      msg,
      from,
      eventId: this.props.eventId
    });
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