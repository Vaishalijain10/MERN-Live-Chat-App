// Context is a feature introduced in React 16.3 that provides a way to share data across components without explicitly passing props down every level of the component tree.
// This can be particularly useful in situations where data needs to be accessed by components that are deeply nested or not directly related in the component hierarchy.
// This object acts as a container for the data you want to share.
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

const ChatContext = createContext();

// wrapper whole app
const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]); // You can keep this if needed for other purposes
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  const navigate = useNavigate();

  // Debugging logs
  console.log("Notification state:", notification);
  console.log("User state:", user);
  console.log("Selected chat:", selectedChat);

  // it is in stringify format so converted and passed in json format
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
      <ToastContainer /> {/* Add ToastContainer here */}
    </ChatContext.Provider>
  );
};

// all state is in this variable
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
