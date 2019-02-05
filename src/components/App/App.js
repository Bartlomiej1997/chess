import React, { Component } from "react";
import { Row, Col } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WaitingRoom from "./../WaitingRoom/WaitingRoom";
import SideMenu from "./../SideMenu/SideMenu";
import Error from "./../Error/Error";
import Lessons from "./../Lessons/Lessons";
import Openings from "./../Openings/Openings";
import Home from "./../Home/Home";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Row>
            <Col span={6}>
              <SideMenu title="CHESS.COM" />
            </Col>
            <Col span={1}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/live" component={WaitingRoom} />
                <Route path="/online" component={WaitingRoom} />
                <Route path="/computer" component={WaitingRoom} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/openings" component={Openings} />
                <Route component={Error} />
              </Switch>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
