import React from 'react';
import ReactDOM from 'react-dom';
// import {Link} from 'react-router-dom';
import EventListEntry from './eventListEntry'

const EventList = (props) => (
  <div>
    <ul className ="video-list list-group">
      {props.publicEvents.map((event,i) => (
        <EventListEntry 
        event={event} 
        key={i} 
        setLookingAtEvent={props.setLookingAtEvent}
        />
      ))}
    </ul>
</div>
)


export default EventList;
