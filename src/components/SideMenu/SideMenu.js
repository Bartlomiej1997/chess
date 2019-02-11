import React, { Component } from "react";
import { Row, Col, Affix, Icon, Divider } from "antd";
import MenuItem from "./MenuItem/MenuItem";
import SubMenu from "./SubMenu/SubMenu";
import { NavLink } from "react-router-dom";

class SideMenu extends Component {
  state = { focused: false, children: null };

  navStyle = { padding: "15px", fontSize: "2vw", marginBottom: "10px", borderBottom:'1px dashed white'};

  render() {
    return (
      <Affix offsetTop={0}>
        <Row>
          <Col
            span={10}
            style={{
              height: "100vh",
              background: this.state.focused ? "#312e2b" : "#111"
            }}
          >
            <Row style={{ margin: "15px" }}>
              <h1 style={{ color: "white", fontWeight:'900', fontSize: "1.3vw"  }}>CHESS.COM</h1>
            </Row>

            <Row
              onMouseEnter={() => {
                this.setState({ focused: true });
              }}
              onMouseLeave={() => {
                this.setState({ focused: false });
              }}
            >
              <SubMenu
                title={
                  <div style={this.navStyle}>
                    <Icon type="play-circle" />
                    <span>Play</span>
                  </div>
                }
                renderChildren={pchildren => {
                  this.setState({ children: pchildren });
                }}
              >
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/live">
                    <div style={this.navStyle}>Live Chess</div>
                  </NavLink>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/online">
                    <div style={this.navStyle}>Online Chess</div>
                  </NavLink>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/computer">
                    <div style={this.navStyle}>Computer</div>
                  </NavLink>{" "}
                </MenuItem>
              </SubMenu>

              <SubMenu
                title={
                  <div style={this.navStyle}>
                    <Icon type="book" />
                    <span>Learn</span>
                  </div>
                }
                renderChildren={pchildren => {
                  this.setState({ children: pchildren });
                }}
              >
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/lessons">
                    <div style={this.navStyle}>Lessons</div>
                  </NavLink>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/openings">
                    <div style={this.navStyle}>Openings</div>
                  </NavLink>{" "}
                </MenuItem>
              </SubMenu>
            </Row>
          </Col>

          <Col
            span={14}
            onMouseEnter={() => {
              this.setState({ focused: true });
            }}
            onMouseLeave={() => {
              this.setState({ focused: false });
              this.setState((this.state.children = null));
            }}
            style={{
              display: this.state.focused ? "block" : "none",
              height: "100vh",
              background: "#111",
              color: "white"
            }}
          >
            {this.state.children}
          </Col>
        </Row>
      </Affix>
    );
  }
}

export default SideMenu;
