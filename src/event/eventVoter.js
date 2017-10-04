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
        
        <div id='movieoption'>
          {this.state.movies[0].title}
        </div>
        <div id='movieoption'>
          {this.state.movies[1].title}
        </div>
        <div id='movieoption'>
          {this.state.movies[2].title}
        </div>
      </div>
    )
  }
}

export default EventVoter;