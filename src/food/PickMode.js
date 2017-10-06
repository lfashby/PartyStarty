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
            <div id="chooseThis">
              <img className="foodImage img-fluid rounded" src={recipe.image} />
              <div className='text'>Choose This</div>
            </div>
            <div>{recipe.label}</div>
            <a href={recipe.url}>Source: {recipe.source}</a><br/>
            <button 
              className='btn btn-primary' 
              type='button' 
              onClick={() => this.props.addtoFoods(recipe)}>
              EAT</button><br/>
          </div>
        )
      })}
    </div>)
  }
} 

export default PickMode;