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
      <div>
        {recipes.map((recipe, i) => {
          return ( 
            <div>
              
            </div>
          )
        })}
      </div>
    )
  }
}

export default DisplayFood;