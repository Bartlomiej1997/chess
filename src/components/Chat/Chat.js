import React, { Component } from "react";
import Message from "./Message/Message";

class Chat extends Component {
  state = {};
  render() {
    return (
      <div style={{border:'1px solid black', padding:'5px', margin:'10px', minHeight:'90vh', maxHeight:'90vh'}}>
        <h1 style={{textAlign:'center'}}>{this.props.title}</h1>
        <div style={{ height:'50%', overflow:'scroll'}}>

        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        </div>
       
        <input type='text'></input>
      </div>
    );
  }
}

export default Chat;
