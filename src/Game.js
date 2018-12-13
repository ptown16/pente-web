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
        {pairsJumped: 0, hasWon: false, color: "rgba(0, 180, 180, 1)"},
        {pairsJumped: 0, hasWon: false, color: "rgba(200, 0, 180, 1)"},
      ],
    }
    this.winMessage = undefined;
  }

  updateGameState(playerID, key, value) {
    let newPlayers = this.state.players;
    if (key === 'pairsJumped') {
      newPlayers[playerID].pairsJumped += value;
      if (value > 0 && this.state.players[playerID].pairsJumped >= 5) {
        this.updateGameState(playerID, 'hasWon', true);
      } else if (value < 0 && this.state.players[playerID].pairsJumped < 5) {
        this.updateGameState(playerID, 'hasWon', false);
      }
    } else if (key === 'hasWon') {
      newPlayers[playerID].hasWon = value;
      if (value) {
        this.winMessage = <div className="win-container"><h1 className="win" style={{color: this.state.players[playerID].color}} >Player {playerID + 1} has won!</h1></div>;
      } else {
        this.winMessage = undefined;
      }
    } else if (key === 'color') {
      newPlayers[playerID].color = value;
    } else {
      console.log('called updateGameState with unknown key!');
    }
    this.setState({
      players: newPlayers,
    });
  }

  render() {
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          <Scoreboard playerID={0} playerColor={this.state.players[0].color} pairsJumped={this.state.players[0].pairsJumped} updateColor={(value) => this.updateGameState(0, 'color', value)}/>
          {this.winMessage}
          <Board boardSize={19} colors={[this.state.players[0].color, this.state.players[1].color]} updateGame={(playerID, key, value = undefined) => this.updateGameState(playerID, key, value)}/>
          <Scoreboard playerID={1} playerColor={this.state.players[1].color} pairsJumped={this.state.players[1].pairsJumped} updateColor={(value) => this.updateGameState(1, 'color', value)}/>
        </div>
      </div>
    );
  }
}

export default Game;
