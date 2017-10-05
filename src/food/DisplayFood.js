import React from 'react';

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
      (<div>
        {recipes.map((recipe, i) => {
          return ( 
            <div className='individualRecipe' key={i}>
              <div>{recipe.label}</div>
              <a href={recipe.url}>Source: {recipe.source}</a><br/>
              <img className="foodImage" src={recipe.image} />
            </div>
          )
        })}
      </div>)
      :
      (<div>
        { this.state.foods.length === 3 ?
          (<div className='submitFood'>
            <button type='button' onClick={(e) => {
              e.preventDefault;
              this.props.handleFoodPicked(this.state.foods);
              }
            }>Submit Meal</button>
          </div>)
          :null
        }
        {
          <div>
          {
            this.state.foods.map((food, i) => {
              return (
                <img src={food.image}/>
              )
            })
          }
          </div>
        }
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