import React from 'react';

const Message = ({ msg, inx }) => (
  <div>
    <h4>{ msg.from }</h4>
    <p>{ msg.text }</p>
  </div>
);

export default Message;