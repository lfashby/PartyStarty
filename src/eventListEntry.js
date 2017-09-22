import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class EventListEntry extends React.Component{
    constructor(props) {
    super(props);
    this.state ={
        currentEvent: {}  
    }
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
    //   !this.props.event? <div>Loading</div>:
            
    <div className ="video-list-entry">
        <button onClick='handleClice()'>

            {this.props.event}
            </button>
    </div>
        )}
}

export default EventListEntry; 