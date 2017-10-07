import React from 'react';

const Message = ({ msg, inx }) => (
  <div className="list-group-item" style={{ width: '100%'}}>
    <h4><img src="glyphicons-4-user.png"/> { msg.from }</h4>
    <p className="chatMessageText">{ msg.text }</p>
  </div>
);

export default Message;