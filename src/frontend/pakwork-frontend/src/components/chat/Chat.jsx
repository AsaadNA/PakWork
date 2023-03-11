import React from "react";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import NavBar from "../navbar/NavBar";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";

const Chat = () => {
  return (
    <Container>
      <NavBar></NavBar>
      <Row className="p-3 box-shadow">
        <Col md={4} style={{ textAlign: "left" }}>
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movies this weekend ?",
                date: new Date(),
                unread: 3,
              },
            ]}
          />
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
            ]}
          />
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 3,
              },
            ]}
          />
        </Col>
        <Col md={8}>
          <div style={{ background: "#e5e5e5" }} className="p-3 mb-3">
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={[
                {
                  position: "left",
                  type: "text",
                  title: "Kursat",
                  text: "Give me a message list example !",
                },
                {
                  position: "right",
                  type: "text",
                  title: "Emre",
                  text: "That's all.",
                },
                {
                  position: "right",
                  type: "text",
                  title: "Emre",
                  text: "That's all.",
                },
                {
                  position: "right",
                  type: "text",
                  title: "Emre",
                  text: "That's all.",
                },
                {
                  position: "left",
                  type: "text",
                  title: "Kursat",
                  text: "Give me a message list example !",
                },
              ]}
            />
          </div>
          <InputGroup>
            <Input
              placeholder="Type here..."
              multiline={true}
              className="form-control"
            />
            <Button
              backgroundColor="green"
              text={"Send  💬"}
              onClick={() => alert("Sending...")}
              title="Send  💬"
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
