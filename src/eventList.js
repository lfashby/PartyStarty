import React from 'react';
import ReactDOM from 'react-dom';
// import {Link} from 'react-router-dom';
import EventListEntry from './eventListEntry'

class EventList extends React.Component{
    constructor(props) {
        super(props);
        this.state ={ 
        }
    }

render() {
    return (
    <div>
        <ul className="list-group">
            {this.props.events.map((event,i) => (
                <EventListEntry event={event} key={i}/>
            ))}  
        </ul>
    </div>
    )
 }
}

export default EventList; 