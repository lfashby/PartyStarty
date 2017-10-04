import React from 'react';

const MessagesDisplay = ({ messages }) => {
  return (
    <div>
      <h3>See your messages here!</h3>
      <ul>
        { messages.map((msg, inx) => (
            <li key={ msg + inx } >
              { msg.text }
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MessagesDisplay;