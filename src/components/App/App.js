import React, { Component } from "react";
import { Button, Row, Col } from "antd";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Row>
         <Col span={12}>Yes</Col>
         <Col span={12}>No</Col>
        </Row>
        <Row>
         <Col>Yes</Col>
         <Col><Button>No</Button></Col>
        </Row>
      </div>
    );
  }
}

export default App;
