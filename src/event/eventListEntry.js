import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
var axios = require ('axios');

const EventListEntry = (props) => (
  <div className ="video-list-entry">
  <li className="list-group-item">
    {props.event.eventTitle}
    <br></br>
    {props.event.eventDesc}
  </li>
</div>
)

export default EventListEntry;



// eventDate
// :
// "2017-01-01T00:00:00.000Z"
// eventDesc
// :
// "IT IS PUBLIC"
// eventFinalized
// :
// null
// eventHostName
// :
// "l"
// eventLocation
// :
// "adlfjl"
// eventPublic
// :
// true
// eventTime
// :
// "01:00"
// eventTitle
// :
// "ME DOG"
// __v
// :
// 0
// _id
// :
// "59d542b4a44fa27afb3fccc2"