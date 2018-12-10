import React, { Component } from 'react';
import './App.css';

// Component for individual box that can either be empty or hold a piece.
class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piece: undefined,
    };
  } 
  
  render() {
    if (this.props.hasPiece) {
      return (
        <div className="square">
          {this.state.piece}
        </div>
      );
    }
    return (
      <div className="square" onClick={() => this.clickHandler()}>
      </div>
    );
  }
  
  clickHandler() {
    this.setState({
      piece: this.props.onClick(),
    });
  }
}

export default Box;