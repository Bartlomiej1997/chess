import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch.js";

class Chessboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <P5Wrapper sketch={sketch} />;
  }
}

export default Chessboard;
