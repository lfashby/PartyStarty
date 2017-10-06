import React from 'react';

class BrowseMode extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    var recipes = this.props.recipes;
    return (
      <div>
        {recipes.map((recipe, i) => {
          return ( 
            <div className='individualRecipe' key={i}>
              <div>{recipe.label}</div>
              <a href={recipe.url}>Source: {recipe.source}</a><br/>
              <img className="foodImage" src={recipe.image} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default BrowseMode;