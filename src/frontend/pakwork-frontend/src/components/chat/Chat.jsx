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

  const fetchChatList = async () => {
    const result = await axios.get("/chat/userlist", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });
    if (result.status === 200) {
      const list = result.data.map((u) => {
        return {
          avatar: DefaultProfile,
          title: u["user"],
          subtitle: u["latest_message"],
          date: u["timestamp"],
          unread: u["unread"],
        };
      });

      setUserList(list);
    }
  };

  //This will fetch the message list for the current selected user
  const fetchMessageList = async () => {
    const result = await axios.get(`/chat/messagelist/${current}`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (result.status === 200) {
      let loggedinuser = JSON.parse(localStorage.getItem("user"))["username"];
      const fetched = result.data.map((m) => {
        return {
          position: m["sender"] === loggedinuser ? "right" : "left",
          type: "text",
          title: m["sender"] === loggedinuser ? "You" : m["sender"],
          text: m["message"],
        };
      });
      setMessageList(fetched);
    }
  };

  //Fetch usrlist on load
  useEffect(() => {
    fetchChatList();
  }, []);

  //Whenever new user selected fetch the message list
  useEffect(() => {
    if (current !== "") {
      //This basically removes the unread count if the window is open
      userList.map((u) => {
        if (u["title"] === current) {
          u["unread"] = 0;
        }
      });

      //Fetches the messsagelist
      fetchMessageList();
    }
  }, [current, userList]);

  //This useEffect handles socket stuff
  useEffect(() => {
    //Recieving the private message
    socket.on("private_message", (data) => {
      const { username, message } = data;
      fetchChatList(); //fetch fresh chat list each time new private message arrives
      //Update the current selected user messages box
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
  }, [current, isConnected, userList]);

  //Handles chat list selection
  const handleSelection = (user) => {
    //When the user basically opens / selects the user we reset the unread count to 0
    let uul = userList.map((u) => {
      if (u["title"] === user) {
        u["unread"] = 0;
      }
      return u;
    });

    setUserList(uul);

    if (user !== current) {
      setCurrent(user);
      setIsSelected(true);
    }
  };

  //Sends the message and updates the relevant stuff
  const sendMessage = async () => {
    let result = await axios.post(
      "/chat/",
      {
        to: current,
        message: message,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      }
    );

    //The message was successfully saved in the database
    if (result.status === 200) {
      //
      /*
      This will update the userList
      If i am sending the message
      
        1. The timestamp will be updated
        2. The latest message will be updated

        The unread count will not be updated since i am the one
           sending the message
      */

      let updatedUserList = userList.map((u) => {
        if (u.title === current) {
          u.subtitle = message;
          u.date = Date.now();
        }
        return u;
      });

      //This updates the Message List
      setMessageList((prev) => [
        ...prev,
        {
          position: "right",
          type: "text",
          title: "You",
          text: message,
        },
      ]);
      socket.emit("private_message", {
        to: current,
        message: message,
      });
    }
  };

  //Find user to add to the chatlist
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
            subtitle: "",
            date: null,
            unread: 0,
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

/*
/*  
      //When Private Message is recived
      //This will update the userList
      let uul = userList.map((u) => {
        if (u["title"] === username) {
          u["subtitle"] = message;
          u["timestamp"] = new Date();
          if (current !== username) {
            u["unread"] = u["unread"] + 1;
          }
        }
        return u;
      });

      setUserList(uul);

    
      //If we recieve a message but the userList is not retrieved
      //We retrieve the user list
      if (userList.length <= 0) {
        fetchChatList();
      }

      //If we have 1 in chatlist but we have another new message
      //But that user is not in our chat list then we fetch our chatlist again
      if (userList.find(username)) {
        fetchChatList();
      } */
