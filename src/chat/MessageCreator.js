import React, { Component } from 'react';

class MessageCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>Send your message here!</h3>
        <input 
          type="text" 
          value={ this.state.message } 
          onChange={ this.handleInputChange }
        />
        <button onClick={
          (e) => this.props.sendMessage(this.state.message) 
        }>
          Send message!
        </button>
      </div>
    )
  }
}

export default MessageCreator;