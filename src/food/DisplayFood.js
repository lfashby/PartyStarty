import React from 'react';

class DisplayFood extends React.Component {
  constructor (props) {
    super (props);
    this.state = {

    }
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
        {recipes.map((recipe, i) => {
          return ( 
            <div className='individualRecipe' key={i}>
              <div>{recipe.label}</div>
              <a href={recipe.url}>Source: {recipe.source}</a><br/>
              <button type='button' onClick={this.props.handleFoodPicked}>Select Meal</button>
              <img className="foodImage" src={recipe.image} />
            </div>
          )
        })}
      </div>  
      )
    )
  }
}

export default DisplayFood;