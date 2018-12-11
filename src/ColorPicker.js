import React, { Component } from 'react';
import './App.css';


class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 765,
      saturation: 20,
    }
  }

  render() {
    return (
      <div className="color-picker-container">
        <div className="top-arrow"></div>
        <div className="color-picker">
          <div className="slider-container">
            <input type="range" min="1" max="1530" defaultValue={765} className="slider" id="hue" onChange={(event) => this.setState({hue: event.target.value})}/>
          </div>
          <div className="slider-container">
            <input type="range" min="0" max="255" defaultValue={20} className="slider" id="saturation" onChange={(event) => this.setState({saturation: event.target.value})}/>
          </div>
          {// TODO: Add boxes that display hex value and RGB value that can be used to input directly
          }
        </div>
      </div>
    );
  }
}
export default ColorPicker;
