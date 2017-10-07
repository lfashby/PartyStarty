import React from 'react';
import BrowseMode from './BrowseMode.js';
import SubmitFood from './SubmitFood.js';
import PickedFoods from './PickedFoods.js';
import PickMode from './PickMode.js';

class DisplayFood extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      foods: []
    }
    this.addtoFoods = this.addtoFoods.bind(this);
  }

  addtoFoods(recipe) {
    this.state.foods.length === 2 ? this.props.setPickStatus() : null;
    this.setState({
      foods: [...this.state.foods, recipe]
    })
  }

  render () {
    var recipes = this.props.recipes;
    var finished = this.state.foods.length === 3;

    return (
      this.props.status === 'browse' ?
      <BrowseMode recipes={recipes}/>
      :
      (<div style={{textAlign: `center`}}>
        { finished ?
          <SubmitFood handleFoodPicked={this.props.handleFoodPicked} foods={this.state.foods}/>
          :null
        }
        { this.state.foods.length > 0 ?
          <PickedFoods foods={this.state.foods}/>
          : null
        }
        { finished ?
          null
          :
          <PickMode recipes={recipes} addtoFoods={this.addtoFoods}/>
        }
      </div>)
    )
  }
}

export default DisplayFood;