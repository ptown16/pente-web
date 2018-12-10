import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'
import Scoreboard from './Scoreboard.js'


// Container Component for Board with, in future, extra information.
class Game extends Component {

  render() {
    const player1Color = "rgba(0, 180, 180, 1)";
    const player2Color = "rgba(200, 0, 180, 1)";
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          <Scoreboard playerID={0} playerColor={player1Color} pairsJumped={2} />
          <Board boardSize={19} colors={[player1Color, player2Color]} />
          <Scoreboard playerID={1} playerColor={player2Color} pairsJumped={4} />
        </div>
      </div>
    );
  }
}

export default Game;
