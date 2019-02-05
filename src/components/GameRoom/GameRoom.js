import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";
import io from "socket.io-client";

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "spectator",
      fen: "",
      socket: io(`http://localhost:3001`),
      room: props.match.params.id,
      renderBoard: false
    };
  }

  componentDidMount() {
    let self = this;
    this.state.socket.on("joined", data => {
      self.setState({ color: data.color, fen: data.fen, renderBoard: true });
    });
    this.state.socket.emit("connect to room", { id: self.state.room });
  }

  componentWillUnmount() {
    console.log("GameRoom unmount")
    this.state.socket.emit("leave", {color:this.state.color, id:this.state.room});
  }


  render() {
    return (
      <div id="chesscol" type="flex" justify="center">
        {this.state.renderBoard ? (
          <Chessboard
            socket={this.state.socket}
            color={this.state.color}
            fen={this.state.fen}
          />
        ) : null}
      </div>
    );
  }
}

export default GameRoom;
