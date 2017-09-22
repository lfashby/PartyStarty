import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
var axios = require ('axios');

class EventListEntry extends React.Component{
  constructor(props) {
  super(props);
  this.state ={
      currentEvent: {}  
  }
  this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
  axios.get('/getEventDetail')
	.then(data => {
		console.log('have data',data)
		this.setState({
			currentEvent: data.data
		})
	})
	.catch(error => {
		console.log('ERROR retrieving Current Event')
	})
  }
  render() {
    return(
          <li className="list-group-item" onClick={this.handleClick}>
            {this.props.event}
            </li>
      )}
}

export default EventListEntry; 