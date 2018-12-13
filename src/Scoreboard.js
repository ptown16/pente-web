import React, { Component } from 'react';
import './App.css';
import ColorPicker from './ColorPicker.js'

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.unfilledColor = this.getUnfilledColor(this.props.player.color);
    this.state = {
      isPickingColor: false,
      isDecidingFF: false
    }
  }

  getUnfilledColor(color) {
      const filledColor = color.split(',');
      return `${filledColor[0]},${filledColor[1]},${filledColor[2]}, 0.3)`;
  }

  renderCircles() {
    const circles = [];
    for (let i = 0; i < 5; i++) {
      if (i < this.props.player.pairsJumped) {
        circles.push(<div className="pair" key={i} style={{backgroundColor: this.props.player.color}}></div>);
      } else {
        circles.push(<div className="pair" key={i} style={{backgroundColor: this.unfilledColor}}></div>);
      }
    }
    return circles;
  }

  submitColor(rgb) {
    const convertedColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    this.props.updateColor(convertedColor);
    this.unfilledColor = this.getUnfilledColor(convertedColor);
    this.setState({isPickingColor: false});
  }

  forfeitGame() {
    this.setState({isDecidingFF: false});
    this.props.forfeitGame();
  }

  renderForfeit() {
    if (this.state.isDecidingFF) {
      return(
        <div>
          <p className="warning-text">Are you sure?</p>
          <button className="forfeit-game" onClick={() => this.forfeitGame()}>Yes</button>
          <button className="decline-ff" onClick={() => this.setState({isDecidingFF: false})}>No</button>
        </div>
      );
    } else {
      return <button className="forfeit-game" onClick={() => this.setState({isDecidingFF: true})}>Forfeit Game</button>
    }
  }

  render() {
    return (
      <div>
        <div className="scoreboard">
          <h2 style={{color: this.props.player.color}}>{this.props.player.name}</h2>
          <p style={{color: this.props.player.color}}>Wins: {this.props.player.wins}</p>
          <div className="circles">
            <p>Pairs Jumped:</p>
            {this.renderCircles()}
          </div>
          <button className="change-color" style={{backgroundColor: this.props.player.color}} onClick={() => this.setState({isPickingColor: !this.state.isPickingColor})} >Change Color</button>
          {this.renderForfeit()}
        </div>
        <ColorPicker visible={this.state.isPickingColor} submitColor={(rgb) => this.submitColor(rgb)}/>
      </div>
    );
  }
}

export default Scoreboard;
