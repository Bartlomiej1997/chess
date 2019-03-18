import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";
import io from "socket.io-client";
import auth from "./../../auth";
import Chat from "./../Chat/Chat";
import GameOverInfo from "./../GameOverInfo/GameOverInfo";
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
      socket = io("/");
      auth(
        socket,
        () => {
          socket.on("joined", data => {
            self.setState({
              color: data.color,
              fen: data.fen,
              renderBoard: true,
              time: data.time,
              increment: data.increment
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
        <Col span={16} id="chesscol" type="flex" justify="center">
          {this.state.renderBoard ? (
            <>
              <Chessboard
                socket={socket}
                color={this.state.color}
                fen={this.state.fen}
              />
              <GameOverInfo
                socket={socket}
                time={this.state.time}
                increment={this.state.increment}
                color={this.state.color}
                bp={this.state.bp}
                wp={this.state.wp}
                onGameOver={this.handleGameOver}
                onSearch={this.handleSearch}
                onRematch={this.handleRematch}
              />
            </>
          ) : null}
        </Col>
        <Col span={8}>
          
        {this.state.renderBoard ? (
            <>
              <Chat socket={socket} height="50vh" />
              />
            </>
          ) : null}
        
    
        </Col>
      </Row>
    );
  }
}

export default GameRoom;
