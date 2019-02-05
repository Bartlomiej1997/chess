import React, { Component } from "react";
import P5Wrapper from "P5Wrapper";
import sketch from "./sketch.js";

class Chessboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <P5Wrapper socket = {this.props.socket} color={this.props.color} fen={this.props.fen} sketch={sketch} />;
  }
}

export default Chessboard;
