import React from 'react';
import BrowseMode from './BrowseMode.js';
import SubmitFood from './SubmitFood.js';
import PickedFoods from './PickedFoods.js';

class DisplayFood extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      foods: []
    }
    this.addtoFoods = this.addtoFoods.bind(this);
  }

  addtoFoods(recipe) {
    this.setState({
      foods: [...this.state.foods, recipe]
    })
  }

  render () {
    var recipes = this.props.recipes;
    return (
      this.props.status === 'browse' ?
      <BrowseMode recipes={recipes}/>
      :
      (<div>
        { this.state.foods.length === 3 ?
          <SubmitFood handleFoodPicked={this.props.handleFoodPicked} foods={this.state.food}/>
          :null
        }
        {
          <div>
          {
            this.state.foods.map((food, i) => {
              return (
                <img key={i} src={food.image}/>
              )
            })
          }
          </div>
        }
        <PickedFoods foods={this.state.foods}/>
        { this.state.foods.length === 3 ?
          null
          :
          (<div>
            {recipes.map((recipe, i) => {
              return ( 
                <div className='individualRecipe' key={i}>
                  <div>{recipe.label}</div>
                  <a href={recipe.url}>Source: {recipe.source}</a><br/>
                  <button type='button' onClick={() => this.addtoFoods(recipe)} >Select Meal</button>
                  <img className="foodImage" src={recipe.image} />
                </div>
              )
            })}
          </div>
          )
        }
      </div>  
      )
    )
  }
}

export default DisplayFood;