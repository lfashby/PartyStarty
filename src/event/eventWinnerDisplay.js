import React from 'react';

const EventWinnerDisplay = (props) => {
  return (
    <div>
      {props.event._id}
      {props.event.eventTitle}
      {props.event.eventLocation}
      {props.event.eventDate}
      {props.event.eventDesc}
      {props.finalMovie.title}
      {props.foods.map((food, index) => {
        return <text key={index} > {food.label} </text>
      })}

      <div className='voterBox'>
        {props.foods.map((food, index) => {
          return <div key={index} className='movieOption'>
            <div className="qEntry">
            <img 
            className="card-img-list" 
            src={food.image} 
          />
              {food.label}
            </div>
          </div>
        })}
      </div>

    </div>
  )
}

export default EventWinnerDisplay;