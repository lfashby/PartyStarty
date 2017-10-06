import React from 'react';

class PickedFoods extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div>
        {
          this.props.foods.map((food, i) => {
            return (
              <img key={i} src={food.image}/>
            )
          })
        }
      </div>
    )
  }
}

export default PickedFoods;