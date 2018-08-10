import React, { Component, Fragment } from "react";
import { MessageBox, MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import "./App.css";
import fire from "./config/fire";

const database = fire.database();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isHidden: true
    };
  }
  handleChatClick = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };
  render() {
    return (
      <Fragment>
        {!this.state.isHidden ? (
          <div className="chat-widget blue">
            <div
              style={{
                padding: "10px",
                marginTop: "0px",
                textAlign: "center",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px"
              }}
            >
              <b className="white-text">Python Doubts</b>
            </div>
            <MessageList
              className="message-list blue lighten-2"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={[
                {
                  position: "right",
                  type: "text",
                  text:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                  date: new Date()
                },
                {
                  position: "left",
                  type: "text",
                  text: "Are u getting message at the left",
                  date: new Date()
                }
              ]}
            />
            <Input
              className="input"
              placeholder="Type here..."
              multiline={true}
              rightButtons={
                <Button color="white" backgroundColor="black" text="Send" />
              }
            />
          </div>
        ) : (
          <Fragment />
        )}
        <a
          id="chat-button"
          class="btn-floating btn-large waves-effect waves-light blue"
          onClick={this.handleChatClick}
        >
          <i class="material-icons">chat</i>
        </a>
      </Fragment>
    );
  }
}

export default App;
