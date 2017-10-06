import React from 'react';

class PickMode extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var recipes = this.props.recipes;
    return (<div>
      {recipes.map((recipe, i) => {
        return ( 
          <div className='individualRecipe' key={i}>
            <div>{recipe.label}</div>
            <a href={recipe.url}>Source: {recipe.source}</a><br/>
            <button type='button' onClick={() => this.props.addtoFoods(recipe)} >Select Meal</button>
            <img className="foodImage" src={recipe.image} />
          </div>
        )
      })}
    </div>)
  }
} 

export default PickMode;