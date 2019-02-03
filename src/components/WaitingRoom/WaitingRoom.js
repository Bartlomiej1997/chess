import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";
import { Row, Col } from "antd";

import io from "socket.io-client";


let socket = io(`http://localhost:3001`);

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { chess: null };
  }
  componentDidMount() {
    socket.on("start", data => {
      this.setState({
        chess: <Chessboard socket={socket} color={data.color} fen={data.fen} />
      });
    });
  }
  render() {
    return (
      <Row type="flex" justify="center">
        <Col>
          <div align="center">{this.state.chess}</div>
        </Col>
      </Row>
    );
  }
}

export default WaitingRoom;
