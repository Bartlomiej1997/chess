import React, { Component } from "react";
import { Row, Col, Icon, Input } from "antd";
import Message from "./Message/Message";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      messages: []
    };

    const self = this;
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  componentDidMount() {
    this.props.socket.emit("join");
    this.props.socket.on("init chat", data => {
      this.setState({ name: data.name, messages: data.history });
    });
    this.scrollToBottom();
    this.props.socket.on("msg", data =>
      this.setState({
        messages: [
          ...this.state.messages,
          { name: data.name, message: data.message }
        ]
      })
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          height: this.props.height,
          border: "1px solid gray",
          background: "#eee",
          borderRadius: "5px",
          padding: "0px",
          margin: "0px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            height: "50px",
            fontSize: "44px",
            textTransform: "uppercase"
          }}
        >
          <Row>
            <Col span={12}>
              <Icon
                type="wechat"
                onMouseEnter={() => {
                  console.log("enter");
                }}
                onMouseLeave={() => {
                  console.log("leave");
                }}
              />
            </Col>
            <Col span={12}>
              <Icon type="user" />
            </Col>
          </Row>
        </h1>
        <div
          style={{
            flexGrow: "1",
            borderTop: "1px solid gray",
            borderBottom: "1px solid gray",
            overflowY: "scroll",
            height: "auto",
            padding: "10px"
          }}
        >
          {this.state.messages.map(msg => (
            <Message user={msg.name} message={msg.message} />
          ))}

          <div
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            if (this.state.name !== "") {
              this.props.socket.emit("msg", this.state.message);
            } else {
              this.props.socket.emit("name", this.state.message);
              this.setState({ name: this.state.message });
            }
            this.setState({ message: "" });
          }}
        >
          <Input
            placeholder={this.state.name === "" ? "Name..." : "Message..."}
            value={this.state.message}
            autoComplete="off"
            name="message"
            onChange={e => {
              this.setState({ [e.target.name]: e.target.value });
            }}
            style={{
              height: "50px",
              padding: "10px",
              fontSize: "20px",
              background: "#ddd"
            }}
          />
        </form>
      </div>
    );
  }
}

export default Chat;
