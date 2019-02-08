import React, { Component } from "react";
import { Card, Button, Row, Col } from "antd";
import { Switch, Redirect, Route, Link } from "react-router-dom";
import auth from "./../../auth";

import io from "socket.io-client";

let socket;

class WaitingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: {},
      redirect: false
    };
  }

  componentDidMount() {
    console.log("Fetching rooms");
    fetch("/rooms")
      .then(res => res.json())
      .then(rooms => self.setState({ rooms }));
    let self = this;

    let authing = () => {
      socket = io("http://localhost:3001");
      auth(
        socket,
        () => {
          console.log("yesyesyesyes");
          socket.on("game found", data => {
            console.log("Game found redirectiong to:", data.id);
            self.setState({ redirect: data.id });
          });

          socket.on("room update", data => {
            let rooms = { ...self.state.rooms };
            rooms[data.id] = data;
            self.setState({ rooms });
          });
        },
        authing
      );
    };
    authing();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  renderRoom({ id, spectators, time, increment, status }, ind) {
    return (
      <Card key={ind} size="small" title={"Room#" + id}>
        <Row>
          <Col span={12}>Status:{status}</Col>
          <Col span={12}>Spectators:{spectators}</Col>
          <Col span={12}>Time:{time + "min " + increment + "sec"}</Col>
          <Col span={12}>
            <Link to={this.props.match.url + "/" + id}>
              <Button onClick={() => this.connectToRoom(id)}>
                {status == "waiting" ? "Graj" : "Oglądaj"}
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    );
  }

  connectToRoom = id => {
    console.log("Connecting to room");
    this.setState({ redirect: id });
  };

  searchForGame = () => {
    console.log("Searching for game");
    socket.emit("search for game", { time: 10, increment: 0 });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/room/" + this.state.redirect} />;
    }

    return (
      <>
        <Button onClick={this.searchForGame}>Wyszukaj grę</Button>
        <Row>
          {Object.keys(this.state.rooms).map((key, ind) =>
            this.renderRoom(this.state.rooms[key], ind)
          )}
        </Row>
      </>
    );
  }
}

export default WaitingRoom;
