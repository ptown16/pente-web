import React, { Component } from 'react';
import './App.css';
import ColorPicker from './ColorPicker.js'


class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.unfilledColor = this.getUnfilledColor(this.props.playerColor);
  }

  getUnfilledColor(color) {
      const filledColor = color.split(',');
      return `${filledColor[0]},${filledColor[1]},${filledColor[2]}, 0.3)`;
  }

  renderCircles() {
    console.log(this.props.playerColor);
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

  submitColor(rgb) {
    const convertedColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    this.props.updateColor(convertedColor);
    this.unfilledColor = this.getUnfilledColor(convertedColor);
  }

  render() {
    return (
      <div>
        <div className="scoreboard">
          <h2 style={{color: this.props.playerColor}}>Player {this.props.playerID + 1}</h2>
          <div className="circles">
            <p>Pairs Jumped:</p>
            {this.renderCircles()}
          </div>
          <button className="change-color" style={{backgroundColor: this.props.playerColor}}>Change Color</button>
        </div>
        <ColorPicker submitColor={(rgb) => this.submitColor(rgb)}/>
      </div>
    );
  }
}

export default Scoreboard;
