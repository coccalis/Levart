import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchConnectedUser, fetchUser } from "../../store/profileSlice";
import { Avatar, Button } from "@nextui-org/react";
import ChatRoomHeader from "./ChatRoomHeader";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { CHAT_URL } from "../../data/Urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import useFetchConversation from "../../hooks/useFetchConversation";

// Define global if it doesn't exist
if (typeof global === "undefined") {
  window.global = window;
}

function ChatRoom() {
  const [stompClient, setStompClient] = useState(null);
  const { receiver } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);
  const [reTrigger, setReTrigger] = useState(false);

  const { conversation, loading, error } = useFetchConversation({
    loginUser: user.username,
    otherUser: receiver,
    reTrigger: reTrigger,
  });
  console.log(conversation);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUser({ username: receiver }));
    dispatch(fetchConnectedUser());
  }, [dispatch, receiver]);

  useEffect(() => {
    const connect = () => {
      const Sock = new SockJS(CHAT_URL);
      const client = over(Sock);
      client.connect({}, () => onConnected(client), onError);
      setStompClient(client);
    };

    connect();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const onConnected = (client) => {
    client.subscribe(`/user/${user.username}/private`, onPrivateMessage);

    client.send(
      "/app/message",
      {},
      JSON.stringify({
        senderName: user.username,
        status: "JOIN",
      })
    );
  };

  useEffect(() => {
    if (conversation) {
      const formattedMessages = conversation.map((msg) => ({
        id: msg.id,
        message: msg.message,
        date: msg.date,
        status: msg.status,
        senderName: msg.senderName.username,
        receiverName: msg.receiverName.username,
      }));

      setMessages(
        formattedMessages.sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }
  }, [conversation]);

  const onPrivateMessage = (payload) => {
    const message = JSON.parse(payload.body);

    setMessages((prevMessages) =>
      [...prevMessages, message].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    );
  };

  const onError = (err) => {
    console.error("WebSocket Error:", err);
  };

  const handleMessageInput = (event) => {
    setMessageInput(event.target.value);
  };

  const sendPrivateMessage = () => {
    if (stompClient && messageInput.trim()) {
      const chatMessage = {
        senderName: user.username,
        receiverName: receiver,
        message: messageInput,
        status: "MESSAGE",
        date: new Date().toISOString(),
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setReTrigger(!reTrigger);
      setMessageInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-1 h-[75vh]">
      <div className="border-1 border-gray-200 rounded-lg shadow-md">
        <ChatRoomHeader receiver={userProfile} />
      </div>

      <div className="border-1 border-gray-200 rounded-lg shadow-md flex-1 overflow-y-auto p-4 h-[70vh]">
        {error && <p>Error loading conversation</p>}
        {!loading && messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((message, index) => {
          const isSender = message.senderName === user.username;

          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] md:max-w-[60%] lg:max-w-[50%] p-3 rounded-2xl my-2 ${
                  isSender
                    ? " bg-chat-bouble text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="break-words">{message.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="border-1 border-gray-200 rounded-lg shadow-md p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-100"
            value={messageInput}
            onChange={handleMessageInput}
            onKeyPress={(e) => e.key === "Enter" && sendPrivateMessage()}
          />
          <Button
            onClick={sendPrivateMessage}
            isIconOnly
            className="bg-mainBtn text-white px-4 py-2 rounded-md "
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
