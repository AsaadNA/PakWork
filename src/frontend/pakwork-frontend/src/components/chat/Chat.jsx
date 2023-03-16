import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";
import { SocketContext } from "../../contexts/socket";
import axios from "../../Api/Api";
import DefaultProfile from "../../assets/profile_pic_default.png";
import NavBar from "../navbar/NavBar";

const Chat = () => {
  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [userList, setUserList] = useState([]); //fetched users list
  const [messageList, setMessageList] = useState([]); //fetches messagelist for chat

  const [fUser, setFUser] = useState(""); //find user
  const [isSelected, setIsSelected] = useState(false); //mabe
  const [current, setCurrent] = useState(""); //current selected from chatlist
  const [message, setMessage] = useState(""); //typing message

  useEffect(() => {
    //Recieving the private message
    socket.on("private_message", (data) => {
      const { username, message } = data;
      if (current === username) {
        setMessageList((prev) => [
          ...prev,
          {
            position: "left",
            type: "text",
            title: username,
            text: message,
          },
        ]);
      }
    });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("private_message");
    };
  }, [current, isConnected]);

  //Handles chat list selection
  const handleSelection = (user) => {
    setCurrent(user);
    setIsSelected(true);
    setMessageList([]);
  };

  const sendMessage = () => {
    socket.emit("private_message", {
      to: current,
      message: message,
    });

    setMessageList((prev) => [
      ...prev,
      {
        position: "right",
        type: "text",
        title: "You",
        text: message,
      },
    ]);
  };

  const findUser = async (user) => {
    const result = await axios.get(`/chat/find/${user}`);
    if (result.status === 200) {
      if (
        result.data.data["username"] !==
        JSON.parse(localStorage.getItem("user"))["username"]
      )
        setUserList((prev) => [
          ...prev,
          {
            avatar: DefaultProfile,
            title: result.data.data["username"],
            subtitle: "Hello World",
            date: new Date(),
            unread: 2,
          },
        ]);
    }
  };

  return (
    <Container>
      <NavBar></NavBar>
      <Row className="mt-4">
        <Col md={4} style={{ textAlign: "left" }}>
          <div className="ms-5 me-4">
            <input
              onChange={(e) => {
                setFUser(e.target.value);
              }}
              type={"text"}
              placeholder="Example: AsaadNA"
            />
            <button onClick={() => findUser(fUser)} className="ms-1">
              Start Chat
            </button>
          </div>
          {userList.length > 0
            ? userList.map((ul, idx) => {
                return (
                  <ChatList
                    key={ul.title}
                    onClick={() => {
                      handleSelection(ul.title);
                    }}
                    className={
                      current === ul.title
                        ? "chat-list chat-list-border mt-4"
                        : "chat-list mt-4"
                    }
                    dataSource={[
                      {
                        avatar: ul.avatar,
                        alt: "kursat_avatar",
                        title: ul.title,
                        subtitle: ul.subtitle,
                        date: ul.date,
                        unread: ul.unread,
                      },
                    ]}
                  />
                );
              })
            : null}
        </Col>
        <Col md={8}>
          {isSelected ? (
            <React.Fragment>
              <div style={{ background: "#e5e5e5" }} className="p-3 mb-3">
                <MessageList
                  className="message-list"
                  lockable={true}
                  toBottomHeight={"100%"}
                  dataSource={messageList.map((m) => {
                    return {
                      position: m.position,
                      type: m.type,
                      title: m.title,
                      text: m.text,
                    };
                  })}
                />
              </div>
              <InputGroup>
                <Input
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type here..."
                  multiline={true}
                  className="form-control"
                />
                <Button
                  backgroundColor="green"
                  text={"Send  💬"}
                  onClick={() => {
                    sendMessage();
                  }}
                  title="Send  💬"
                />
              </InputGroup>
            </React.Fragment>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
