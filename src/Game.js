import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'
import Scoreboard from './Scoreboard.js'


// Container Component for Board with, in future, extra information.
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        {pairsJumped: 0, hasWon: false},
        {pairsJumped: 0, hasWon: false},
      ],
    }
  }

  updateGameState(playerID, key) {
    if (key === 'pairsJumped') {
      let newPlayers = this.state.players;
      newPlayers[playerID].pairsJumped += 1;
      this.setState({
        players: newPlayers,
      });
    } else {
      let newPlayers = this.state.players;
      newPlayers[playerID].hasWon = true;
      this.setState({
        players: newPlayers,
      });
    }
  }

  render() {
    const player0Color = "rgba(0, 180, 180, 1)";
    const player1Color = "rgba(200, 0, 180, 1)";
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          <Scoreboard playerID={0} playerColor={player0Color} pairsJumped={this.state.players[0].pairsJumped} />
          <Board boardSize={19} colors={[player0Color, player1Color]} updateGame={(playerID, key) => this.updateGameState(playerID, key)}/>
          <Scoreboard playerID={1} playerColor={player1Color} pairsJumped={this.state.players[1].pairsJumped} />
        </div>
      </div>
    );
  }
}

export default Game;
