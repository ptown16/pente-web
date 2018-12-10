import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'


// Container Component for Board with, in future, extra information.
class Game extends Component {
  
  render() {
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          <Board boardSize={19} colors={["#123456", "blue"]} />
        </div>
      </div>
    );
  }
}

export default Game;
