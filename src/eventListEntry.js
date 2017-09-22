import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
var axios = require ('axios');

class EventListEntry extends React.Component{
  constructor(props) {
  super(props);
    
  }

  render() {
    return(
      <div className ="video-list-entry">
        <li className="list-group-item" onClick={()=> {this.props.onClick(this.props.event)}}>
          {this.props.event}
        </li>
      </div>
    )}
}

export default EventListEntry;
