import React, { Component } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { Redirect } from "react-router-dom";

class GameOverInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      redirect: null,
      title: "You win!",
      body: "Playername win because of checkmate",
      searching: false
    }
    if (props.increment > 0) {
      this.state.newGameButtonText = `New ${this.props.time} | ${this.props.increment}`;
    } else {
      this.state.newGameButtonText = `New ${this.props.time} min`;
    }
    let self = this;
    this.props.socket.on("game found", data => {
      console.log("Game found redirectiong to:", data.id);
      self.setState({ redirect: data.id });
    });

    this.props.socket.on("game over", data => {
      if (self.props.onGameOver)
        self.props.onGameOver();
      let title = "", body = "";
      switch (data.reason) {
        case "checkmate":
          body = <><strong>{self.props.wp}</strong>{" won with checkmate"}</>;
          switch (data.winner) {
            case "w":
              if (self.props.color === "w") title = "You win!";
              else title = "White wins";
              break;
            case "b":
              if (self.props.color === "b") title = "You win!";
              else title = "Black wins";
              break;
            default:
              break;
          }
          break;
        case "draw":
          title = "Draw";
          switch (data.type) {
            case "50":
              body = "50 move rule";
              break;
            case "insufficient":
              body = "Insufficient material";
              break;
            case "repetition":
              body = "Threefold repetition";
              break;
            case "accepted":
              body = "Players agreement";
              break;
            case "stalemate":
              body = "Stalemate";
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      self.setState({ title, body })
      self.showModal();
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  searchForGame = () => {
    if (this.props.onSearch)
      this.props.onSearch();
    this.setState({ searching: true });
  }

  handleRematch = () => {
    if (this.props.onRematch)
      this.props.onRematch();
    console.log("Rematch!");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/room/" + this.state.redirect} />;
    }

    return (
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        mask={false}
      >
        <Row type="flex" justify="center">
          {this.state.title}
        </Row>
        <Row type="flex" justify="center">
          {this.state.body}
        </Row>
        <Row type="flex" justify="center" gutter={5}>
          <Col span={10}>
            <Button style={{ width: "100%" }} onClick={() => { this.handleRematch(); this.handleCancel() }}>Rematch</Button>
          </Col>
          <Col span={10}>
            <Button style={{ width: "100%" }} onClick={() => { this.searchForGame(); this.handleCancel() }}>{this.state.newGameButtonText}</Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default GameOverInfo;