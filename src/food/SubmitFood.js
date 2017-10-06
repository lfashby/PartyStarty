import React from 'react';

class SubmitFood extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (<div className='submitFood'>
      <button type='button' onClick={(e) => {
        e.preventDefault;
        this.props.handleFoodPicked(this.props.foods);
        }
      }>Submit Meal</button>
    </div>)
  }
}

export default SubmitFood;