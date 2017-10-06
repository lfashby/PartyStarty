import React from 'react';

const Message = ({ msg, inx }) => (
  <div>
<<<<<<< HEAD
    <h4><img src="glyphicons-4-user.png"/> { msg.from }</h4>
    <p className="chatMessageText">{ msg.text }</p>
=======
    <h4><span class="glyphicon glyphicon-user"></span> { msg.from }</h4>
    <p>{ msg.text }</p>
>>>>>>> update messaging css
  </div>
);

export default Message;