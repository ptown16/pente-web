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
        {pairsJumped: 0, hasWon: true, color: "rgba(0, 180, 180, 1)"},
        {pairsJumped: 0, hasWon: false, color: "rgba(200, 0, 180, 1)"},
      ],
    }
    this.winMessage = undefined;
  }

  updateGameState(playerID, key, value) {
    if (key === 'pairsJumped') {
      let newPlayers = this.state.players;
      newPlayers[playerID].pairsJumped += 1;
      this.setState({
        players: newPlayers,
      });
      if (this.state.players[playerID].pairsJumped >= 5) {
        this.updateGameState(playerID, 'hasWon', true);
      }
    } else if (key === 'hasWon') {
      let newPlayers = this.state.players;
      newPlayers[playerID].hasWon = value;
      this.setState({
        players: newPlayers,
      });
      this.winMessage = <div className="win-container"><h1 className="win" style={{color: this.state.players[playerID].color}} >Player {playerID + 1} has won!</h1></div>;
    }
  }

  render() {
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          <Scoreboard playerID={0} playerColor={this.state.players[0].color} pairsJumped={this.state.players[0].pairsJumped} />
          {this.winMessage}
          <Board boardSize={19} colors={[this.state.players[0].color, this.state.players[1].color]} updateGame={(playerID, key, value = undefined) => this.updateGameState(playerID, key, value)}/>
          <Scoreboard playerID={1} playerColor={this.state.players[1].color} pairsJumped={this.state.players[1].pairsJumped} />
        </div>
      </div>
    );
  }
}

export default Game;
