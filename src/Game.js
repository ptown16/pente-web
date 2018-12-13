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
        {name: "Peyton", pairsJumped: 0, hasWon: false, color: "rgba(0, 180, 180, 1)", wins: 0},
        {name: "Braydon", pairsJumped: 0, hasWon: false, color: "rgba(200, 0, 180, 1)", wins: 0},
      ],
    }
    this.board = React.createRef();
    this.winMessage = undefined;
  }

  restartGame() {
    this.winMessage = undefined;
    const newPlayers = this.state.players;
    for (let i = 0; i < this.state.players.length; i++) {
      if (newPlayers[i].hasWon) {
        newPlayers[i].hasWon = false;
        newPlayers[i].wins += 1;
        this.board.current.remakeBoard(Math.abs(i - 1));
      }
      newPlayers[i].pairsJumped = 0;
    }
    this.setState({
      players: newPlayers
    })
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
        this.winMessage = <div className="win-container"><h1 className="win" style={{color: this.state.players[playerID].color}} >{this.state.players[playerID].name} has won!<br/> <button onClick={() => this.restartGame()}>Start new game?</button></h1></div>;
      } else {
        this.winMessage = undefined;
      }
    } else if (key === 'color') {
      newPlayers[playerID].color = value;
    } else if (key === 'wins') {
      newPlayers[playerID].wins += value;
    } else {
      console.log('called updateGameState with unknown key!');
    }
    this.setState({
      players: newPlayers,
    });
  }

  forfeitGameTwoPlayer(playerID) {
    const winner = Math.abs(playerID - 1);
    this.updateGameState(winner, 'hasWon', true);
  }

  render() {
    return (
      <div>
        <h2 className="title">Pente Web</h2>
        <div className="App">
          <Scoreboard
            player={this.state.players[0]}
            updateColor={(value) => this.updateGameState(0, 'color', value)}
            forfeitGame={() => this.forfeitGameTwoPlayer(0)}
          />
          {this.winMessage}
          <Board ref={this.board} boardSize={19} colors={[this.state.players[0].color, this.state.players[1].color]} updateGame={(playerID, key, value = undefined) => this.updateGameState(playerID, key, value)}/>
          <Scoreboard
            player={this.state.players[1]}
            updateColor={(value) => this.updateGameState(1, 'color', value)}
            forfeitGame={() => this.forfeitGameTwoPlayer(1)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
