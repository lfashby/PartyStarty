import React from 'react';
import EventFoodDisplay from './eventFood.js'

const EventWinnerDisplay = (props) => {
  return (
    <div>
      

      <div className="voterBox" >
        <div className="imageBox" >
          <img 
            className="img-thumbnail" 
            src={`https://image.tmdb.org/t/p/w500${props.finalMovie.poster}`} 
          />
        </div>

        <div className="eventDetailBox">
          <text>
              You were invited to the {props.event.eventTitle}:{props.event.eventDesc}
              <br/>
              Hosted By {props.event.eventHostName}
              <br/>
              on {props.event.eventDate} {props.event.eventTime}
              <br/>
              at {props.event.eventLocation}
              <br />
              Title: {props.finalMovie.title}
              <br />
              Overview: {props.finalMovie.overview}
              <br />
              Total Points: {props.finalMovie.totalUserVotes}
          </text>
        </div>

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