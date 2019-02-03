import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";

const { SubMenu } = Menu;

class SideMenu extends React.Component {
  state = {
    mode: "vertical",
    theme: "dark"
  };

  render() {
    return (
      <div>
        <Menu
          style={{ width: 256 }}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          <Menu.Item key="Home">
            <NavLink to="/">
              <span>
                <Icon type="home" />
                <span>Home</span>
              </span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            key="Play"
            title={
              <span>
                <Icon type="play-circle" />
                <span>Play</span>
              </span>
            }
          >
            <Menu.Item key="Live">
              <NavLink to="/live">Live Chess</NavLink>
            </Menu.Item>
            <Menu.Item key="Online">
              <NavLink to="/online">Online Chess</NavLink>
            </Menu.Item>
            <Menu.Item key="Computer">
              <NavLink to="/computer">Computer</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="Learn"
            title={
              <span>
                <Icon type="book" />
                <span>Learn</span>
              </span>
            }
          >
            <Menu.Item key="Lessons">
              <NavLink to="/lessons">Lessons</NavLink>
            </Menu.Item>
            <Menu.Item key="Openings">
              <NavLink to="/openings">Openings</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default SideMenu;
