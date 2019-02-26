import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";
import io from "socket.io-client";
import auth from "./../../auth";
import Chat from "./../Chat/Chat";
import { Row, Col } from "antd";

let socket;

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "spectator",
      fen: "",
      room: props.match.params.id,
      renderBoard: false
    };
  }

  componentDidMount() {
    let self = this;

    let authing = () => {
      socket = io("http://localhost:3001");
      auth(
        socket,
        () => {
          socket.on("joined", data => {
            self.setState({
              color: data.color,
              fen: data.fen,
              renderBoard: true
            });
          });
          socket.emit("connect to room", { id: self.state.room });
        },
        authing
      );
    };
    authing();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    return (
      <Row>
        <Col span={16}>
      <div id="chesscol" type="flex" justify="center">
        {this.state.renderBoard ? (
          <Chessboard
          socket={socket}
          color={this.state.color}
          fen={this.state.fen}
          />
          ) : null}
      </div>
      </Col>
      <Col span={8}>
      <Chat socket={socket} height='50vh'/>

      
      </Col >
      
      
      </Row>
    );
  }
}

export default GameRoom;
