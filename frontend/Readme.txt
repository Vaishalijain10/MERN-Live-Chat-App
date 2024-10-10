frontend
-------------
run -> npm start
----------------

1.  npx create-react-app frontend
2. chakra ui ->
    npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
    adding chakra in index.js
    "proxy":"http://127.0.0.1:5000",
3.  npm i react-router-dom
4. created pages folder -> homepage and chats
5. rafce - shortcut to get the basic structure of react -> react functional component
6. npm i axios (helps to connect the frontend and backend)
7. in chakra Ui -> we have used following things 
    -> tabs -> toggle button
    -> vstaks -> vertical align tags ->
8. cloudinary upload image -> https://api.cloudinary.com/v1_1/:cloud_name/:action
9.  chat page before updating ->
import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatPage = () => {
  // creating a hook using useState
  //   initially it will be an empty array
  // here there are two variables -> chats and setchats, chats are used to display the data and setchats will be used to change the value of the chats variable.
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    // here we put the endpoint as mentioned in backend/server.js
    const { data } = await axios.get("/api/chat");
    // all the data will go to setchats variable.
    setChats(data);
    console.log(data);
  };

  //   useEffect is a hook in react
  useEffect(() => {
    // it occurs when the functions is rended this useEffect is called.
    fetchChats();
  }, []);

  // in the div tag we use "{}" curly braces to write the javascript.
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
      chat page
    </div>
  );
};
export default ChatPage;
10. npm i @chakra-ui/icons



------------------------------------

rafce
rfce