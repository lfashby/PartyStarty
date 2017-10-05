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
        <form>
        <input 
          type="text" 
          value={ this.state.message } 
          onChange={ this.handleInputChange }
        />
        <button onClick={
          (e) => { 
              e.preventDefault();
              this.props.sendMessage(this.state.message);
              this.setState({ message: '' });
            }
        }>
          Send message!
        </button>
        </form>
      </div>
    )
  }
}

export default MessageCreator;