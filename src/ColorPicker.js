import React, { Component } from 'react';
import './App.css';


class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 765,
      saturation: 255,
      hueRgb: [0, 255, 255],
      finalRgb: [0, 255, 255],
    }
  }

  updateHueRGB() {
    const loopValue = Math.floor(this.state.hue / 255);
    const remainder = this.state.hue % 255
    if (loopValue === 0) {
      this.setState({ hueRgb: [255, remainder, 0] });
    } else if (loopValue === 1) {
      this.setState({ hueRgb: [255 - remainder, 255, 0] });
    } else if (loopValue === 2) {
      this.setState({ hueRgb: [0, 255, remainder] });
    } else if (loopValue === 3) {
      this.setState({ hueRgb: [0, 255 - remainder, 255] });
    } else if (loopValue === 4) {
      this.setState({ hueRgb: [remainder, 0, 255] });
    } else {
      this.setState({ hueRgb: [255, 0, 255 - remainder] });
    }
    this.updateFinalRGB();
  }

  updateFinalRGB() {
    const saturationConst = (this.state.saturation / 255);
    const editedRgb = [];
    for (const colorChannel of this.state.hueRgb) {
      editedRgb.push(Math.floor(colorChannel * saturationConst));
    }
    this.setState({
      finalRgb: editedRgb,
    });
  }

  render() {
    if (this.props.visible) {
      return (
        <div className="color-picker-container">
          <div className="top-arrow"></div>
          <div className="color-picker">
            <div className="slider-container">
              <input type="range" min="0" max="1529" defaultValue={765} className="slider" id="hue" onChange={(event) => {this.setState({hue: event.target.value}); this.updateHueRGB();}}/>
            </div>
            <div className="slider-container">
              <input type="range" min="0" max="255" defaultValue={255} className="slider" id="saturation" style={{background: `linear-gradient(to right, rgb(0, 0, 0) 0%, rgba(${this.state.hueRgb[0]}, ${this.state.hueRgb[1]}, ${this.state.hueRgb[2]}, 1))`}} onChange={(event) => {this.setState({saturation: event.target.value}); this.updateFinalRGB();}}/>
            </div>
            <button onClick={() =>this.props.submitColor(this.state.finalRgb)}>Done</button>
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}
export default ColorPicker;
