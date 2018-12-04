import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Board extends Component { 
  constructor(props){
    super(props);
    this.state = {
      currentColorIndex: 0,
    };
  }
  
  renderBox(xPos, yPos) {
    return <Box x={xPos} y={yPos} onClick={() => this.renderPiece()}/>;
  }
    
  renderRow(rowPos) {
    let row = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      row.push(this.renderBox(i, rowPos));
    }
    const keyedRow = row.map((box) =>
        <div className="square" key={box.props.x + box.props.y * this.props.boardSize}>{box}</div>
    );
    return keyedRow;
  }
  
  renderBoard() {
    let column = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      column.push(this.renderRow(i));
    }
    const keyedColumn = column.map((row) =>
      <div className="row" key={row[0].key}>{row}</div>
    );
    console.log(keyedColumn);
    return keyedColumn;
  }
  
  renderPiece() {
    let i = this.state.currentColorIndex;
    if (this.state.currentColorIndex >= this.props.colors.length - 1) {
      this.setState({currentColorIndex: 0});
    } else {
      this.setState({currentColorIndex: i + 1});
    }
    return (<div className="dot" style={{backgroundColor: this.props.colors[i]}}></div>);
  }
    
  render() {
    return (
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
      piece: undefined,
    };
  } 
  
  render() {
    if (this.state.hasPiece) {
      return (
        <div className="square">
          {this.state.piece}
        </div>
      );
    }
    return (
      <div className="square" onClick={() => this.clickHandler()}>
        <div className="dot">({this.props.x}, {this.props.y})</div>
      </div>
    );
  }
  
  clickHandler() {
    this.setState({
      hasPiece: true,
      piece: this.props.onClick(),
    });
  }
}

class Game extends Component {
  
  render() {
    return (
      <div className="App">
        <Board boardSize={19} colors={["#0A2239", "#A50005", "#087E8B", "#345830", "#FF4D80"]}/>
      </div>
    );
  }
}

export default Game;
