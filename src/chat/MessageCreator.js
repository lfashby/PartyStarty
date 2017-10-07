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
        <form onSubmit={
          (e) => { 
              e.preventDefault();
              if(this.state.message) {
                this.props.sendMessage(this.state.message);
                this.setState({ message: '' });
              }
            }}>
          <div className="input-group">
          <span className="input-group-btn">
            <button 
              className="btn btn-secondary"
              type="button"
            >
              Send message!
            </button>
          </span>
          <input
            className="form-control" 
            type="text" 
            value={ this.state.message } 
            onChange={ this.handleInputChange }
            id="chatTextInput"
            placeholder="Your message here..."
          />
          </div>
          </form>
    )
  }
}

export default MessageCreator;