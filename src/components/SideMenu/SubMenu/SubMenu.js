import React, { Component } from "react";

class SubMenu extends Component {
  state = {};
  render() {
    console.log(this.props.children);
    return (
      <div>
        <div
          onMouseEnter={() =>
            this.props.renderChildren(<div>{this.props.children}</div>)
          }
         
          style={{ color: "#fff" }}
        >
          {this.props.title}
        </div>{" "}
      </div>
    );
  }
}

export default SubMenu;
