import React, { Component } from "react";
import P5Wrapper from './../P5Wrapper/P5Wrapper';
import sketch from "./sketch.js";

class Chessboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dobra = () => {
    // this.setState({jeden:this.state.jeden+1});
  }

  render() {
    return (
      <div>
        <P5Wrapper
          socket={this.props.socket}
          color={this.props.color}
          fen={this.props.fen}
          sketch={sketch}
          functions={{
            onSelect: e => e.preventDefault(),
            onContextMenu: e => e.preventDefault(),
            onClick: e => e.preventDefault(),
            onMouseUp: e => e.preventDefault(),
            onMouseDown: e => e.preventDefault(),
          }}
        />
      </div>
    );
  }
}

export default Chessboard;
