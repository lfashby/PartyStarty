import React from 'react';

class PickedFoods extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var message = '', length = this.props.foods.length, answer = `Please pick ${3-length} more`;
    if (length === 1) {
      message = answer;
    } else if (length === 2) {
      message = answer;
    }

    return (
      <div className='pickedFoods'>
        {
          length !== 3 ? <div>{message}</div> : null
        }
        {
          this.props.foods.map((food, i) => {
            if (i === this.props.foods.length -1) {
              return <img className='pickedFoodImageLast' key={i} src={food.image}/>;
            } else {
              return <img className='pickedFoodImage' key={i} src={food.image}/>;
            }
          })
        }
      </div>
    )
  }
}

export default PickedFoods;