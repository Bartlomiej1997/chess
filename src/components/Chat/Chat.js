import React, { Component } from "react";
import { Input } from 'antd';
import Message from "./Message/Message";

class Chat extends Component {
  state = {};
  render() {
    return (
      <div style={{border:'1px solid black', padding:'5px', margin:'10px', height:'95vh'}}>
        <h1 style={{textAlign:'center', height:'10vh'}}>{this.props.title}</h1>
        <div style={{ height:'50%', overflowY:'scroll', height:'70vh'}}>

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
        <Message/>
        <Message/>
        <Message/>
        <Message/>

        </div>
       <div style={{height:'10vh'}}> 
        <Input placeholder=". . ." />
       </div>
      </div>
    );
  }
}

export default Chat;
