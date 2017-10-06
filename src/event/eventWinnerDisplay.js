import React from 'react';

const EventWinnerDisplay = (props) => {
  return (
    <div>
      {props.event.eventTitle}
      {props.event.eventLocation}
      {props.event.eventDate}
      {props.event.eventDesc}
      {props.finalMovie.title}
      hey this is showing
    </div>
  )
}

export default EventWinnerDisplay;