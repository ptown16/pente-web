import React, { Component } from 'react';
import './App.css';
import Box from './Box.js'

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentColorIndex: 0,
      hasGridGenerated: false,
      pieceGrid: Array(this.props.boardSize * this.props.boardSize).fill(false)
    };
  }

  // Converts two grid points to the array index for pieceGrid
  xyPosToArray(xPos, yPos) {
    return xPos + (this.props.boardSize * yPos);
  }

  // Renders a single Box of Board
  renderBox(xPos, yPos) {
    let hasPiece = undefined;
    if (this.state.pieceGrid[this.xyPosToArray(xPos, yPos)] === false) {
      hasPiece = false;
    } else {
      hasPiece = true;
    }
    return <Box x={xPos} y={yPos} hasPiece={hasPiece} onClick={() => this.renderPiece(xPos, yPos)}/>;
  }

  // Renders rows of Board
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

  // Renders grid of Board
  renderBoard() {
    let column = [];
    for (let i = 0; i < this.props.boardSize; i++) {
      column.push(this.renderRow(i));
    }
    // Adds new incremental key to each row
    const keyedColumn = column.map((row, i) =>
      <div className="row" key={i}>{row}</div>
    );
    return keyedColumn;
  }

  // Tests to see if a jump with that specific piece has been completed.
  testSingleJump(xPos, yPos, xInterval, yInterval) {
    // Makes sure that a jump can exist in this direction (so the jumps tested aren't out of bounds)
    if (xPos + (3 * xInterval) >= 0 && xPos + (3 * xInterval) < this.props.boardSize && yPos + (3 * yInterval) >= 0 && yPos + (3 * yInterval) < this.props.boardSize) {
      const jump1 = this.state.pieceGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)];
      // Tests to see if the piece placed has a neighbor in that direction
      if (jump1 !== false) {
        const start = this.state.pieceGrid[this.xyPosToArray(xPos, yPos)];
        // Tests to see if the piece placed is not the same as the neighbor
        if (jump1 !== start) {
          const jump2 = this.state.pieceGrid[this.xyPosToArray(xPos + (2 * xInterval), yPos + (2 * yInterval))];
          // Tests to see if the neighbor's next in line is the same color as the neighbor
          if (jump1 === jump2) {
            const jump3 = this.state.pieceGrid[this.xyPosToArray(xPos + (3 * xInterval), yPos + (3 * yInterval))];
            // Tests to see if the encompassing piece is the same as the start.
            if (jump3 === start) {
              this.props.updateGame(start, 'pairsJumped');
              // Remove the two pieces in the middle of the jump
              const newGrid = this.state.pieceGrid;
              newGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)] = false;
              newGrid[this.xyPosToArray(xPos + (2 * xInterval), yPos + (2 * yInterval))] = false;
              this.setState({pieceGrid: newGrid});
            }
          }
        }
      }
    }
  }

  // Tests to see if a piece completes a 5 or longer chain in a specific direction
  testFiveInARow(xPos, yPos, xInterval, yInterval) {
    // Two separate tests to count pieces in front of and behind the piece placed
    const start = this.state.pieceGrid[this.xyPosToArray(xPos, yPos)];
    // Test pieces in front of the starting piece
    let forwardsCounter = 0;
    let nextChain = undefined;
    // Test to make sure the initial next chain is still in bounds
    if (xPos + xInterval < this.props.boardSize && xPos + xInterval >= 0 && yPos + yInterval < this.props.boardSize && yPos + yInterval >= 0) {
      nextChain = this.state.pieceGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)];
    }
    // Keep counting until it hits an edge OR the piece at a spot is not equal to the starting piece
    while (start === nextChain && (xInterval === 0 || forwardsCounter + xPos < this.props.boardSize) && (yInterval === 0 || forwardsCounter + yPos < this.props.boardSize)) {
      forwardsCounter += 1
      nextChain = this.state.pieceGrid[this.xyPosToArray(xPos + ((forwardsCounter + 1) * xInterval), yPos + ((forwardsCounter + 1) * yInterval))];
    }
    // Test pieces behind the starting piece
    let backwardsCounter = 0;
    nextChain = undefined;
    // Test to make sure the initial next chain is still in bounds
    if (xPos - xInterval < this.props.boardSize && xPos - xInterval >= 0 && yPos - yInterval < this.props.boardSize && yPos - yInterval >= 0) {
      nextChain = this.state.pieceGrid[this.xyPosToArray(xPos - xInterval, yPos - yInterval)];
    }
    // Keep counting until it hits an edge OR the piece at a spot is not equal to the starting piece
    while (start === nextChain && (xInterval === 0 || backwardsCounter <= xPos) && (yInterval === 0 || backwardsCounter <= yPos)) {
      backwardsCounter += 1
      nextChain = this.state.pieceGrid[this.xyPosToArray(xPos - ((backwardsCounter + 1) * xInterval), yPos - ((backwardsCounter + 1) * yInterval))];
    }
    // If it has counted four total outside of the piece just placed, it will declare a winner (in console for now)
    if (backwardsCounter + forwardsCounter >= 4) {
      console.log(`The player with color ${this.props.colors[start]} wins!`);
    }
  }

  // Updates the board to see if any jump comditions or win conditions are met for the piece that has just been places
  updateBoard(xPos, yPos) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // Don't test if the interval goes nowhere
        if (i !== 0 || j !== 0) {
          this.testSingleJump(xPos, yPos, i, j);
        }
      }
    }
    // Since this tests both forward and backwards, only test five in a row for intervals: x: 0, y: 1 | x: 1, y: 1 | x: 1, y: 0 | x: 1, y: -1
    for (let i = 0; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if(i !== 0 || j > 0)
        this.testFiveInARow(xPos, yPos, i, j)
      }
    }
  }

  addPiece(xPos, yPos, i) {
    // newGrid is made so that we don't directly mutilate the state
    const newGrid = this.state.pieceGrid;
    newGrid[this.xyPosToArray(xPos, yPos)] = i;
    this.setState({pieceGrid: newGrid});
  }

  determineNextColor(i) {
    // This conditional is made to update the color of the next piece to be the next color.
    if (this.state.currentColorIndex >= this.props.colors.length - 1) {
      this.setState({currentColorIndex: 0});
    } else {
      this.setState({currentColorIndex: i + 1});
    }
  }

  // Renders a specific piece when a box is clicked (this method is passed into every Box element as an arrow function)
  renderPiece(xPos, yPos) {
    // i is the index within colors that the next rendered piece is going to be
    let i = this.state.currentColorIndex;
    this.addPiece(xPos, yPos, i);
    this.determineNextColor(i);
    // Test win and jump conditions
    this.updateBoard(xPos, yPos);
    // The actual piece itself
    return (<div className="dot" style={{backgroundColor: this.props.colors[i]}}></div>);
  }

  // Renders the board
  render() {
    return (
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
