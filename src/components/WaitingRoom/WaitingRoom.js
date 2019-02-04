import React, { Component } from "react";
import Chessboard from "./../Chessboard/Chessboard";
import { Button, Row, Col } from "antd";

import io from "socket.io-client";

class WaitingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = { socket: io(`http://localhost:3001`), rooms: {} };

    let self = this;
    this.state.socket.on("room update", data => {
      let rooms = { ...self.state.rooms };
      rooms[data.id] = data;
      self.setState({ rooms });
    });
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
      <div>
        <Button>Wyszukaj grę</Button>
        <Row>
          {Object.keys(this.state.rooms).map((key, ind) => (
            <Card size="small" title={"Room#" + this.state.rooms[key].id}>
              <Row>
                <Col span={12}>Status:{this.state.rooms[key].status}</Col>
                <Col span={12}>
                  Spectators:{this.state.rooms[key].spectators}
                </Col>
                <Col span={12}>
                  Time:
                  {this.state.rooms[key].time +
                    "min " +
                    this.state.rooms[key].increment +
                    "sec"}
                </Col>
                <Col span={12}><Link to><Button></Button></Link></Col>
              </Row>
            </Card>
          ))}
        </Row>
      </div>
    );
  }
}

export default WaitingRoom;
