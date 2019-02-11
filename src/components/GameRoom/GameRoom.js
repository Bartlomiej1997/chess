import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";
import io from "socket.io-client";
import auth from "./../../auth";

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
      
      <div id="chesscol" type="flex" justify="center">
        {this.state.renderBoard ? (
          <Chessboard
            socket={socket}
            color={this.state.color}
            fen={this.state.fen}
          />
        ) : null}
      </div>
    );
  }
}

export default GameRoom;
