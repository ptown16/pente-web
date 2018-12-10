import React, { Component } from 'react';
import './App.css';


class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.unfilledColor = this.getUnfilledColor();
  }

  getUnfilledColor() {
      const filledColor = this.props.playerColor.split(',');
      return `${filledColor[0]},${filledColor[1]},${filledColor[2]}, 0.3)`;
  }

  renderCircles() {
    const circles = [];
    for (let i = 0; i < 5; i++) {
      if (i < this.props.pairsJumped) {
        circles.push(<div className="pair" key={i} style={{backgroundColor: this.props.playerColor}}></div>);
      } else {
        circles.push(<div className="pair" key={i} style={{backgroundColor: this.unfilledColor}}></div>);
      }
    }
    return circles;
  }

  render() {
    return (
      <div className="scoreboard">
        <h2 style={{color: this.props.playerColor}}>Player {this.props.playerID + 1}</h2>
        <div className="circles">
          <p>Pairs Jumped:</p>
          {this.renderCircles()}
        </div>
      </div>
    );
  }
}

export default Scoreboard;
