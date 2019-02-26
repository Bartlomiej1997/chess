import React, { Component } from 'react';

class Message extends Component {
    state = {  }
    render() { 
        return ( <p><strong>{this.props.user}:</strong> {this.props.message}</p> );
    }
}
 
export default Message;


