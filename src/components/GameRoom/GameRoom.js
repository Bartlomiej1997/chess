import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";

class GameRoom extends Component {
  state = {};
  render() {
    return (
      <Row id="chesscol" type="flex" justify="center">
        <Chessboard socket={socket} color={data.color} fen={data.fen}/>
      </Row>
    );
  }
}

export default GameRoom;
