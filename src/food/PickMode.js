import React from 'react';

class PickMode extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var recipes = this.props.recipes;
    return (<div style={{margin:`auto`}}>
      {recipes.map((recipe, i) => {
        return ( 
          <div className='individualRecipe' key={i}>
            <div id="chooseThis">
              <img 
                className="foodImage img-fluid rounded" 
                src={recipe.image} 
                onClick={() => this.props.addtoFoods(recipe)}/>
              <div className='text'>Choose This</div>
            </div>
            <div>{recipe.label}</div>
            <a href={recipe.url}>Source: {recipe.source}</a><br/>
          </div>
        )
      })}
    </div>)
  }
} 

export default PickMode;