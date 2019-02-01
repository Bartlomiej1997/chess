import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import Chessboard from './../Chessboard/Chessboard';

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
         <Col><Chessboard/></Col>
        </Row>
      </div>
    );
  }
}

export default App;
