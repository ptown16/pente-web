import React, { Component } from 'react';
import './App.css';
import Box from './Box.js'

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentColorIndex: 0,
      hasGridGenerated: false,
      pieceGrid: Array(this.props.boardSize * this.props.boardSize).fill(false),
      prevMove: [{canUndo: false, position: [], jumps: [], winning: false}, {canUndo: false, position: [], jumps: [], winning: false}],
    };
  }

  // Converts two grid points to the array index for pieceGrid
  xyPosToArray(xPos, yPos) {
    return xPos + (this.props.boardSize * yPos);
  }

  // Renders a single Box of Board
  renderBox(xPos, yPos) {
    let hasPiece = undefined;
    let pieceColor = undefined;
    if (this.state.pieceGrid[this.xyPosToArray(xPos, yPos)] === false) {
      hasPiece = false;
    } else {
      hasPiece = true;
      pieceColor = this.props.colors[this.state.pieceGrid[this.xyPosToArray(xPos, yPos)]];
    }
    return <Box x={xPos} y={yPos} hasPiece={hasPiece} pieceColor={pieceColor} onClick={() => this.renderPiece(xPos, yPos)}/>;
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
              this.props.updateGame(start, 'pairsJumped', 1);
              // Remove the two pieces in the middle of the jump
              const newGrid = this.state.pieceGrid;
              const newMove = this.state.prevMove;
              newGrid[this.xyPosToArray(xPos + xInterval, yPos + yInterval)] = false;
              newGrid[this.xyPosToArray(xPos + (2 * xInterval), yPos + (2 * yInterval))] = false;
              newMove[this.state.currentColorIndex].jumps.push([xPos + xInterval, yPos + yInterval, jump1]);
              newMove[this.state.currentColorIndex].jumps.push([xPos + (2 * xInterval), yPos + (2 * yInterval), jump2]);
              this.setState({
                pieceGrid: newGrid,
                prevMove: newMove,
              });
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
      const newMove = this.state.prevMove;
      newMove[this.state.currentColorIndex].winning = true;
      this.setState({
        prevMove: newMove,
      });
      this.props.updateGame(start, 'hasWon', true);
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
    const newMove = this.state.prevMove;
    newGrid[this.xyPosToArray(xPos, yPos)] = i;
    newMove[i] = {canUndo: true, position: [xPos, yPos], jumps: [], winning: false};
    this.setState({
      pieceGrid: newGrid,
      prevMove: newMove,
    });
  }

  determineNextColor(i, forward) {
    // This conditional is made to update the color of the next piece to be the next color.
    if (forward) {
      if (this.state.currentColorIndex >= this.props.colors.length - 1) {
        return 0
      } else {
        return i + 1;
      }
    } else {
      if (this.state.currentColorIndex === 0) {
        return this.props.colors.length - 1;
      } else {
        return i - 1;
      }
    }
  }

  // Renders a specific piece when a box is clicked (this method is passed into every Box element as an arrow function)
  renderPiece(xPos, yPos) {
    // i is the index within colors that the next rendered piece is going to be
    let i = this.state.currentColorIndex;
    this.addPiece(xPos, yPos, i);
    this.updateBoard(xPos, yPos);

    this.setState({
      currentColorIndex: this.determineNextColor(i, true),
    })
  }

  undoMove() {
    const newMove = this.state.prevMove;
    const newGrid = this.state.pieceGrid;
    const undoingIndex = this.determineNextColor(this.state.currentColorIndex, false);
    const undoing = newMove[undoingIndex];
    if (undoing.canUndo) {
      newGrid[this.xyPosToArray(undoing.position[0], undoing.position[1])] = false;
      for (const jump of undoing.jumps) {
        newGrid[this.xyPosToArray(jump[0], jump[1])] = jump[2];
      }
      this.props.updateGame(undoingIndex, 'pairsJumped', -(undoing.jumps.length / 2));
      if (undoing.winning) {
        this.props.updateGame(undoingIndex, 'hasWon', false);
      }
      newMove[undoingIndex] = {canUndo: false, position: [], jumps: [], winning: false};
      this.setState({
        currentColorIndex: undoingIndex,
      });
    }
    this.setState({
      pieceGrid: newGrid,
      prevMove: newMove,
    });
  }

  existsUndoableMove() {
    for (const move of this.state.prevMove) {
      if (move.canUndo) {
        return true;
      }
    }
    return false;
  }

  renderUndoButton() {
    if (this.existsUndoableMove()) {
      return <button className="undo undo-active" onClick={() => this.undoMove()}>Undo Move</button>
    } else {
      return <button className="undo undo-disabled">Undo Move</button>
    }
  }

  // Renders the board
  render() {
    let undoButton = this.renderUndoButton();
    return (
      <div>
        <div className="board">
          {this.renderBoard()}
        </div>
        {undoButton}
      </div>
    );
  }
}

export default Board;
