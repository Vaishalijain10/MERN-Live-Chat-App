import React from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
// import { useState } from "react";

const ChatPage = () => {
  // const [fetchAgain, setFetchAgain] = useState(false);
  // destructure the user state inside of it.
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens, horizontal on medium and above
        justifyContent="space-between"
        w="100%"
        pt="12px"
        gap={{ base: "10px", sm: "15px", md: "20px" }} // Responsive gap
      >
        {/* List of Contacts */}
        {user && (
          <Box
            flex={{ base: "1", md: "1", lg: "0 0 380px" }}
            mr="0px"
            p="2px"
            ml="10px"
          >
            <MyChats />
          </Box>
        )}

        {/* Messages Box */}
        {user && (
          <Box flex="2" minWidth={{ base: "100%", md: "0" }}>
            {/* Ensure full width on smaller screens */}
            <Chatbox />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
