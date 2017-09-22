import React from 'react';
import ReactDOM from 'react-dom';
// import {Link} from 'react-router-dom';
import EventListEntry from './eventListEntry'

class EventList extends React.Component{
    constructor(props) {
        super(props);
    }

  render() {
    return (
      <div>
        <ul className ="video-list list-group">
          {this.props.events.map((event,i) => (
            <EventListEntry event={event} key={i} onClick={this.props.onClick}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default EventList;
