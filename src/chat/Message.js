import React from 'react';

const Message = ({ msg, inx }) => (
  <div>
    <h4><span class="glyphicon glyphicon-user"></span> { msg.from }</h4>
    <p>{ msg.text }</p>
  </div>
);

export default Message;