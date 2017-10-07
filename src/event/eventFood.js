import React from 'react';

const EventFoodDisplay = (props) => {
  return (
    <div className="foodBox" >
      {props.foods.map((food, index) => {
        return
          <div key={index} className='movieOption'>
            {food.label}
            <img 
            className="img-thumbnail" 
            src={food.image} 
            />
          </div>
      })}
    </div>
  )
}

export default EventFoodDisplay;