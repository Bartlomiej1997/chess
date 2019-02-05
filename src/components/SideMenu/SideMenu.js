import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import MenuItem from "./MenuItem/MenuItem";
import SubMenu from "./SubMenu/SubMenu";
import { NavLink } from "react-router-dom";

import "./SideMenu.css";

class SideMenu extends Component {
  state = { hidden: true, children: null };
  show = () => {
    this.setState({ hidden: false });
  };
  hide = () => {
    this.setState({ hidden: true });
  };

  renderChildren = pchildren => {
    this.setState((this.state.children = pchildren));
  };

  render() {
    return (
      <div style={{position:'fixed'}}>
        <Row style={{ margin: "0px"}}>
          <Col span={12} style={{ background: "#111", height: "100%" }}>
            <Row style={{ margin: "15px", color: "white" }}>
              {this.props.title}
            </Row>
            <Row
              className="row"
              onMouseEnter={this.show}
              onMouseLeave={this.hide}
            >
              <SubMenu
                title={
                  <span>
                    <Icon type="play-circle" />
                    <span>Play</span>
                  </span>
                }
                renderChildren={this.renderChildren}
              >
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/live">Live Chess</NavLink>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/online">Online Chess</NavLink>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/computer">Computer</NavLink>{" "}
                </MenuItem>
              </SubMenu>
            </Row>
            <Row
              className="row"
              onMouseEnter={this.show}
              onMouseLeave={this.hide}
            >
              <SubMenu
                style={{height:'100%'}}
                title={
                  <span>
                    <Icon type="book" />
                    <span>Learn</span>
                  </span>
                }
                renderChildren={this.renderChildren}
              >
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/lessons">Lessons</NavLink>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <NavLink style={{ color: "white" }} to="/openings">Openings</NavLink>{" "}
                </MenuItem>
              </SubMenu>
            </Row>
          </Col>
          <Col
            span={12}
            onMouseEnter={this.show}
            onMouseLeave={()=>{
              this.hide();
              this.setState((this.state.children = null));
            }}
            style={{
              height: "100% !important",
              background: "gray",
              display: this.state.hidden ? "none" : "block"
            }}
          >
            {this.state.children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SideMenu;
