import React, { Component } from "react";
import { Row } from "antd";

class MenuItem extends Component {
  state = {};
  render() {
    return (
      <Row>
        <div >{this.props.children}</div>
      </Row>
    );
  }
}

export default MenuItem;
