import React from 'react';
import Message from './Message';

const MessagesDisplay = ({ messages }) => {
  return (
    <div>
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