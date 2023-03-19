import React, { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";
import { SocketContext } from "../../contexts/socket";
import { Comment } from "react-loader-spinner";
import axios from "../../Api/Api";
import DefaultProfile from "../../assets/profile_pic_default.png";
import NavBar from "../navbar/NavBar";
import "react-chat-elements/dist/main.css";
import moment from "moment/moment";

const Chat = () => {
  const location = useLocation();

  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [userList, setUserList] = useState([]); //fetched users list
  const [messageList, setMessageList] = useState([]); //fetches messagelist for chat

  const [fUser, setFUser] = useState(""); //find user
  const [isSelected, setIsSelected] = useState(false); //mabe
  const [current, setCurrent] = useState(""); //current selected from chatlist
  const [message, setMessage] = useState(""); //typing message

  const [isLL, setisLL] = useState(false); //userlist loaded or not
  const [isMLL, setisMLL] = useState(false);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList, isMLL]);

  const fetchChatList = async () => {
    setisLL(false); //userlist loaded ?:
    const result = await axios.get("/chat/userlist", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });
    if (result.status === 200) {
      setisLL(true);
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

  useEffect(() => {
    if (isLL) {
      //Open window will make unread 0
      let uul = userList.map((u) => {
        if (u["title"] === current) {
          u["unread"] = 0;
        }
        return u;
      });

      setUserList(uul);
    }
  }, [isLL, current]);

  //This is for when the user is redirect from the start chat component
  //Check if userlist is loaded or not
  useEffect(() => {
    if (isLL) {
      if (location.state) {
        const { to } = location.state;
        const exists = userList.filter((u) => u["title"] === to);
        if (exists.length === 0) {
          setUserList((prev) => [
            ...prev,
            {
              avatar: DefaultProfile,
              title: to,
              subtitle: "Start chat by sending message",
              date: null,
              unread: 0,
            },
          ]);
        }
      }
    }
  }, [isLL]);

  //This will fetch the message list for the current selected user
  const fetchMessageList = async () => {
    setisMLL(false);
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
          date: moment
            .utc(m["timestamp"])
            .local()
            .format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      setMessageList(fetched);
      //Sets the MLL after 2.5 seconds
      //for a cool fetching effect delay thingy
      setTimeout(() => {
        setisMLL(true);
      }, 1800);
    }
  };

  //Fetch usrlist on load
  useEffect(() => {
    fetchChatList();
  }, []);

  //Whenever new user selected fetch the message list
  useEffect(() => {
    if (current !== "") {
      //Fetches the messsagelist
      fetchMessageList();
    }
  }, [current]); //, userList

  //This useEffect handles socket stuff
  useEffect(() => {
    //Recieving the private message
    socket.on("private_message", (data) => {
      const { username, message, message_id } = data;
      fetchChatList(); //fetch fresh chat list each time new private message arrives
      //Update the current selected user messages box
      if (current === username) {
        socket.emit("window_open_change_reciever_status", {
          message_id,
          sender: username,
          reciever: JSON.parse(localStorage.getItem("user"))["username"],
        });
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
    if (message !== "") {
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
            date: new Date(),
          },
        ]);

        socket.emit("private_message", {
          to: current,
          message: message,
        });
      }
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
            subtitle: "Start chat by sending message",
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
              {isMLL ? (
                <div className="p-3 mb-3">
                  <div className="chatbox-shadow pt-4 pb-3">
                    <MessageList
                      className="message-list"
                      lockable={false}
                      toBottomHeight={"100%"}
                      dataSource={messageList.map((m) => {
                        return {
                          position: m.position,
                          type: m.type,
                          title: m.title,
                          text: m.text,
                          date: m.date,
                        };
                      })}
                    />
                    <div ref={messagesEndRef} />
                  </div>

                  <InputGroup>
                    <Input
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type here..."
                      multiline={true}
                      className="form-control mt-4"
                    />
                    <Button
                      backgroundColor="#cccccc"
                      className="mt-4"
                      text={"Send"}
                      onClick={() => {
                        sendMessage();
                      }}
                      title="Send  💬"
                    />
                  </InputGroup>
                </div>
              ) : (
                <div className="mt-5 pt-5">
                  <Comment
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#FFF"
                    backgroundColor="#c9c9c9"
                  />
                  <h6 style={{ color: "#545454" }}>
                    {" "}
                    Loading your messages...
                  </h6>
                </div>
              )}
            </React.Fragment>
          ) : (
            <h2 className="mt-5 pt-5" style={{ color: "#545454" }}>
              {" "}
              Enter Fancy Design like whatsapp here
            </h2>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
