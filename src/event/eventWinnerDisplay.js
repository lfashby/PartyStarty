import React from 'react';
import EventFoodDisplay from './eventFood.js'

const EventWinnerDisplay = (props) => {
  return (
    <div>
      <div className="eventDetailBox">
        You were invited to the {props.event.eventTitle}:{props.event.eventDesc}
        <br/>
        Hosted By {props.event.eventHostName}
        <br/>
        on {props.event.eventDate} {props.event.eventTime}
        <br/>
        at {props.event.eventLocation}
      </div>

      <div className="voterBox" >
        <img 
          className="img-thumbnail" 
          src={`https://image.tmdb.org/t/p/w500${props.finalMovie.poster}`} 
        />
        <text>
          Title: {props.finalMovie.title}
          <br />
          Overview: {props.finalMovie.overview}
          <br />
          Total Points: {props.finalMovie.totalUserVotes}
        </text>
      </div>

      <div className='foodBox'>
        {props.foods.map((food, index) => {
          return <div key={index} className='movieOption'>
            <div className="qEntry">
              <img 
                className="img-thumbnail" 
                src={food.image} 
              />
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default EventWinnerDisplay;