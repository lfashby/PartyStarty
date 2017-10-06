import React from 'react';

const Message = ({ msg, inx }) => (
  <div>
    <h4><img src="glyphicons-4-user.png"/> { msg.from }</h4>
    <p className="chatMessageText">{ msg.text }</p>
  </div>
);

export default Message;