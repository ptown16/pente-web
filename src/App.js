import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Board extends Component { 
  constructor(props){
    super(props);
    this.state = {
      currentColorIndex: 0,
      hasGridGenerated: false,
      pieceGrid: Array(361).fill(false)
    };
  }
  
  xyPosToArray(xPos, yPos) {
    return xPos + (19 * yPos);
  }
  
  renderBox(xPos, yPos) {
    let hasPiece = undefined;
    if (this.state.pieceGrid[this.xyPosToArray(xPos, yPos)] === false) {
      hasPiece = false;
    } else {
      hasPiece = true;
    } 
    return <Box x={xPos} y={yPos} hasPiece={hasPiece} onClick={() => this.renderPiece(xPos, yPos)}/>;
  }
    
  renderRow(rowPos) {
    let row = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      row.push(this.renderBox(i, rowPos));
    }
    const keyedRow = row.map((box, i) =>
        <div className="square" key={i}>{box}</div>
    );
    return keyedRow;
  }
  
  renderBoard() {
    let column = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      column.push(this.renderRow(i));
    }
    const keyedColumn = column.map((row, i) =>
      <div className="row" key={i}>{row}</div>
    );
    return keyedColumn;
  }
  
  testSingleJump(xPos, yPos, xInterval, yInterval) {
    const jump1 = this.state.pieceGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)]; 
    if (jump1 !== false) {
      const start = this.state.pieceGrid[this.xyPosToArray(xPos, yPos)];
      if (jump1 !== start) {
        const jump2 = this.state.pieceGrid[this.xyPosToArray(xPos + (2 * xInterval), yPos + (2 * yInterval))];
        if (jump1 === jump2) {
          const jump3 = this.state.pieceGrid[this.xyPosToArray(xPos + (3 * xInterval), yPos + (3 * yInterval))];
          if (jump3 === start) {
            this.state.pieceGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)] = false;
            this.state.pieceGrid[this.xyPosToArray(xPos + (2 * xInterval), yPos + (2 * yInterval))] = false;
          }
        }
      }
    }
  }
  
  testFiveInARow(xPos, yPos, xInterval, yInterval) {
    const start = this.state.pieceGrid[this.xyPosToArray(xPos, yPos)];
    let forwardsCounter = 0;
    let nextChain = this.state.pieceGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)]; 
    while (start === nextChain && (xInterval === 0 || forwardsCounter + xPos < this.props.boardSize) && (yInterval === 0 || forwardsCounter + yPos >= this.props.boardSize)) {
      forwardsCounter += 1
      nextChain = this.state.pieceGrid[this.xyPosToArray(xPos + (forwardsCounter * xInterval), yPos + (forwardsCounter * yInterval))];
      console.assert(forwardsCounter < this.props.boardSize, "Counter backwards went further than bounds of board.");
    }
    nextChain = this.state.pieceGrid[this.xyPosToArray(xPos - xInterval, yPos - yInterval)];
    let backwardsCounter = 0;
    while (start === nextChain && (xInterval === 0 || backwardsCounter <= xPos) && (yInterval === 0 || backwardsCounter <= yPos)) {
      backwardsCounter += 1
      nextChain = this.state.pieceGrid[this.xyPosToArray(xPos - (backwardsCounter * xInterval), yPos - (backwardsCounter * yInterval))];
      console.assert(backwardsCounter < this.props.boardSize, "Counter backwards went further than bounds of board.");
    }
    if (backwardsCounter + forwardsCounter >= 5) {
      console.log(`The player with color ${this.props.colors[start]} wins!`);
    }
  }
  
  renderPiece(xPos, yPos) {
    let i = this.state.currentColorIndex;
    this.state.pieceGrid[xPos + (19 * yPos)] = i;
    if (this.state.currentColorIndex >= this.props.colors.length - 1) {
      this.setState({currentColorIndex: 0});
    } else {
      this.setState({currentColorIndex: i + 1});
    }
    this.updateGame(xPos, yPos);
    return (<div className="dot" style={{backgroundColor: this.props.colors[i]}}></div>);
  }
            
  updateGame(xPos, yPos) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          this.testSingleJump(xPos, yPos, i, j);
        }
      }
    }
    for (let i = 0; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if(i !== 0 || j > 0)
        this.testFiveInARow(xPos, yPos, i, j)
      }
    }
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

class Game extends Component {
  
  render() {
    const board = <Board boardSize={19} colors={["#123456", "blue"]}/>;
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          {board}
        </div>
      </div>
    );
  }
}

export default Game;
