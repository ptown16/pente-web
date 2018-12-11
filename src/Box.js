import React, { Component } from 'react';
import './App.css';

// Component for individual box that can either be empty or hold a piece.
class Box extends Component {

  render() {

    if (this.props.hasPiece) {
      return (
        <div className="square">
          <div className="dot" style={{backgroundColor: this.props.pieceColor}}></div>
        </div>
      );
    }
    return (
      <div className="square" onClick={() => this.clickHandler()}>
      </div>
    );
  }

  clickHandler() {
    this.props.onClick();
  }
}

export default Box;
