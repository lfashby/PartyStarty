import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class EventListEntry extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className ="video-list-entry">
        <button onClick={()=> {this.props.onClick(this.props.event)}}>
          {this.props.event}
        </button>
      </div>
    )}
}

export default EventListEntry;
