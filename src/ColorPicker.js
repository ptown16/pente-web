import React, { Component } from 'react';
import './App.css';


class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 765,
      saturation: 255,
      rgb: [0, 255, 255],
    }
  }

  updateRGB() {
    const loopValue = Math.floor(this.state.hue / 255);
    const remainder = this.state.hue % 255
    if (loopValue === 0) {
      this.setState({ rgb: [255, remainder, 0] });
    } else if (loopValue === 1) {
      this.setState({ rgb: [255 - remainder, 255, 0] });
    } else if (loopValue === 2) {
      this.setState({ rgb: [0, 255, remainder] });
    } else if (loopValue === 3) {
      this.setState({ rgb: [0, 255 - remainder, 255] });
    } else if (loopValue === 4) {
      this.setState({ rgb: [remainder, 0, 255] });
    } else {
      this.setState({ rgb: [255, 0, 255 - remainder] });
    }
  }

  render() {
    return (
      <div className="color-picker-container">
        <div className="top-arrow"></div>
        <div className="color-picker">
          <div className="slider-container">
            <input type="range" min="0" max="1529" defaultValue={765} className="slider" id="hue" onChange={(event) => {this.setState({hue: event.target.value}); this.updateRGB();}}/>
          </div>
          <div className="slider-container">
            <input type="range" min="0" max="255" defaultValue={255} className="slider" id="saturation" style={{background: `linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(${this.state.rgb[0]}, ${this.state.rgb[1]}, ${this.state.rgb[2]}, 1))`}} onChange={(event) => this.setState({saturation: event.target.value})}/>
          </div>
          {// TODO: Add boxes that display hex value and RGB value that can be used to input directly
          }
        </div>
      </div>
    );
  }
}
export default ColorPicker;
