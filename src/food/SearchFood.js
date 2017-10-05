import React from 'react';
import axios from 'axios';
import DisplayFood from './DisplayFood.js';

class SearchFood extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      term: ``,
      recipeData: []
    }
    this.setTerm = this.setTerm.bind(this);
    this.submit = this.submit.bind(this);
  }

  setTerm (e) {
    e.preventDefault();
    this.setState({
      term: e.target.value
    })
  }

  submit (e) {
    //console.log('hi');
    e.preventDefault();
    axios({
      method: 'POST',
      url: `/recipes`,
      data: {
        q: this.state.term
      }
    })
    .then(result => {
      var recipe = result.data.hits.map(recipe => recipe.recipe);
      console.log(recipe);
      this.setState({
        recipeData: recipe
      })      
    })
    .catch(err => {
      console.log('SearchFood.js', err);
      return;
    })
  }

  render () {
    return (
      <div>
        <input placeholder='enter food'
          onChange={this.setTerm}
          value={this.state.term}/>
        <button type='button'
          onClick={this.submit}>
          Send
        </button>
        {
          this.state.recipeData.length > 0 ? 
          (<div>
            <DisplayFood status={this.props.status} handleFoodPicked={this.props.handleFoodPicked || null} recipes={this.state.recipeData} />
          </div>)
          :
          null
        }
      </div>
    )
  }
}

export default SearchFood;