import React from "react";
// import { ChatState } from "../../Context/ChatProvider";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user: userProp, handleFunction }) => {
  // Destructure props
  // const { user } = ChatState();
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={userProp.name} 
        src={userProp.pic} 
      />
      <Box>
        <Text>{userProp.name}</Text> 
        <Text fontSize="xs">
          <b>Email : </b>
          {userProp.email} 
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
