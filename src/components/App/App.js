import React, { Component } from "react";
import { Row, Col } from "antd";
import Chessboard from "./../Chessboard/Chessboard";

import "./App.css";
import io from "socket.io-client";
let socket = io(`http://localhost:3001`);

class App extends Component {
  state = {
    chess: null
  };
  componentDidMount() {
    socket.on("start", data => {
      this.setState({
        chess: <Chessboard socket={socket} color={data.color} fen={data.fen} />
      });
    });
  }
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col>
            <div align="center">{this.state.chess}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
