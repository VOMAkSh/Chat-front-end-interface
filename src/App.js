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
      newMessage: "",
      messages: [],
      isHidden: true
    };
  }
  componentDidMount() {
    window.gapi.hangout.render("hangouts", {
      render: "createhangout",
      initial_apps: [
        {
          app_id: "184219133185",
          start_data: "dQw4w9WgXcQ",
          app_type: "ROOM_APP"
        }
      ]
    });
    database.ref("/messages").on("child_added", snapshot => {
      console.log(snapshot.val());
      const message = {
        type: "text",
        text: snapshot.val().message,
        date: new Date(snapshot.val().date)
      };
      if (snapshot.val().author === "test user") {
        message.position = "right";
      } else {
        message.position = "left";
      }
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }
  handleChatClick = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
    if (document.getElementById("hangouts").style.opacity == 0) {
      document.getElementById("hangouts").style.opacity = 1;
    } else {
      document.getElementById("hangouts").style.opacity = 0;
    }
  };
  sendMessage = () => {
    if (this.state.newMessage.trim() !== "") {
      database
        .ref("/messages")
        .push()
        .set({
          message: this.state.newMessage,
          author: "test user",
          date: new Date().toString()
        });
    }
    console.log(this.refs.input);
    this.refs.input.state.value = "";
    console.log(this.state.newMessage);
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <iframe
            style={{
              width: "100%",
              borderStyle: "none"
            }}
            src="data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%20src%3D%22https%3A%2F%2Fgist.github.com%2FVOMAkSh%2F8483fe7e466e82d4c78877c26af43546.js%22%3E%3C%2Fscript%3E%3C%2Fbody%3E"
          />
        </div>

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
              <b className="white-text">Doubts</b>
              <br />
              <b className="white-text">
                Post code url in case of problem in code. Don't paste whole code
                here
              </b>
            </div>
            <MessageList
              className="message-list blue lighten-2"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.state.messages}
            />
            <Input
              ref="input"
              className="input"
              placeholder="Type here..."
              multiline={true}
              value={this.state.newMessage}
              onChange={event => {
                this.setState({
                  newMessage: event.target.value
                });
              }}
              onKeyDown={event => {
                if (event.keyCode === 13) {
                  event.preventDefault();
                }
              }}
              maxHeight={25}
              autoHeight={false}
              maxlength={60}
              rightButtons={
                <Button
                  color="white"
                  backgroundColor="black"
                  text="Send"
                  onClick={this.sendMessage}
                />
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
        <div
          id="hangouts"
          style={{
            opacity: 0,
            position: "fixed",
            bottom: "30px",
            right: "100px"
          }}
        />
      </Fragment>
    );
  }
}

export default App;
