import React from 'react';
import axios from 'axios';

class SearchFood extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      term: ``
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
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/recipes',
      data: {
        q: this.state.term
      }
    })
    .then(result => {
      console.log(result);
      
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
      </div>
    )
  }
}

export default SearchFood;