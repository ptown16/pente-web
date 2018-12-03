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
      <div className="row">
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
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPiece: false,
    };
  } 
  
  render() {
    if (this.state.hasPiece) {
      return (
        <div className="square">
          <Piece color="#008080" />
        </div>
      );
    }
    return (
      <div className="square" onClick={() => this.setState({hasPiece: true})}>
        <div class="dot">({this.props.x}, {this.props.y})</div>
      </div>
    );
  }
}

class Piece extends Component {
  render() {
    return(
      <div className="dot" style={{backgroundColor:this.props.color}}></div>
    );
  }
}

export default Board;
