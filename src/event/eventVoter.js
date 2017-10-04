import React from 'react';


class EventVoter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        {
          title: "bug's life"
        },{
          title: "departed"
        },{
          title: "hello"
        }
      ]
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id='voterbox'>
      
      <form>
        <div id='movieoption'>
          {this.state.movies[0].title}
         
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
        </div>
        <div id='movieoption'>
          {this.state.movies[1].title}
          <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
        </div>
        <div id='movieoption'>
          {this.state.movies[2].title}
          <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
        </div>
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EventVoter;