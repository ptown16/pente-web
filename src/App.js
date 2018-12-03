import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Board extends Component { 
  renderBox(xPos, yPos) {
    return <Box x={xPos} y={yPos} />;
  }
    
  renderRow(rowPos) {
    let row = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      row.push(this.renderBox(i, rowPos));
    }
    return (
      <div class="row">
      {row}
      </div>
    );
  }
  
  renderBoard() {
  let column = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      column.push(this.renderRow(i));
    }
    return column;
  }
    
  render() {
    return(
      <div class="board">
        {this.renderBoard()}
      </div>
    );
  }
}

class Box extends Component {
  render() {
    return (
      <div class="square">
        ({this.props.x}, {this.props.y})
      </div>
    );
  }
}

export default Board;
