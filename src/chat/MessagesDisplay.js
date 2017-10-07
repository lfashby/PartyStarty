import React from 'react';
import Message from './Message';

const MessagesDisplay = ({ messages }) => {
  return (
    <div id="messageDisplayContainer" className="list-group">
      { messages.map((msg, inx) => (
          <Message
            key={ msg + inx }
            msg={ msg }
            inx={ inx }
          />
        ))}
    </div>
  );
}

export default MessagesDisplay;